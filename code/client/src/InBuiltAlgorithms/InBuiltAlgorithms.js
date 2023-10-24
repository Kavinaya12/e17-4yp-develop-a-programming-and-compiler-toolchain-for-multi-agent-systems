export const algorithms = [
  {
    name: "Dynamic Task Allocation",
    className: "DynamicTaskAllocationRobot",
    code: `package Robots;

    import swarm.behaviours.atomicBehaviours.AtomicBehaviours;
    import swarm.behaviours.clusterBehaviours.ClusterBehaviours;
    import swarm.mqtt.MqttMsg;
    import swarm.robot.exception.SensorException;
    import swarm.robot.types.RGBColorType;
    
    import csvRecorder.CsvRecorder;
    
    import java.util.*;
    import java.util.concurrent.Future;
    
    import static swarm.behaviours.clusterBehaviours.Helpers.printQueue;
    
    public class DynamicTaskAllocationRobot extends ObstacleAvoidanceRobot{
    
        ClusterBehaviours clusterBehaviours = new ClusterBehaviours();
        AtomicBehaviours atomicBehaviours = new AtomicBehaviours();
        Queue<String> taskDemandQueue = new LinkedList<>();
        Queue<String> taskSupplyQueue = new LinkedList<>();
        static int fixedQueueLength = 5;
        static float scalingFactor = 0.015f;
        static int n = 10; // steepness of task selection probability
        float responseThresholdRed;
        float responseThresholdBlue;
        float responseThresholdRedNext;
        float responseThresholdBlueNext;
        float estimatedTaskDemandForRed;
        float estimatedTaskDemandForBlue;
        float estimatedTaskSupplyForRed;
        float estimatedTaskSupplyForBlue;
        float taskSelectionProbabilityRed;
        float taskSelectionProbabilityBlue;
        String selectedTask;
        int timeStep = 0;
    
        long startTime;
        int robotId;
    
        public DynamicTaskAllocationRobot(int id, double x, double y, double heading) {
            super(id, x, y, heading);
            robotId = id;
        }
     
        public void setup() {
    
            super.setup();
    
            // initially assign task Red
            selectedTask = "r";
            atomicBehaviours.showSelectedTask(selectedTask,this.neoPixel,this.simpleComm,robotId);
    
            // assign initial random thresholds
            Random rand = new Random();
    
            this.responseThresholdRed = rand.nextFloat();
            this.responseThresholdBlue = rand.nextFloat();
    
            CsvRecorder.recordInitialThresholdValues("src/main/java/csvRecorder/record.csv",this.getId(),this.responseThresholdRed,this.responseThresholdBlue);
    
            System.out.println("Robot "+this.id+" is running Dynamic Task Allocation Algorithm");
            System.out.println("Robot initially set to task: "+ selectedTask);
            System.out.println("Robot initially assigned random threshold values: r: "+ responseThresholdRed + "  b: "+ responseThresholdBlue);
    
        }
    
        public void loop() throws Exception {
            super.loop();
    //        runTaskAllocationAlgorithm();
            action2Future = executor.submit(() -> {
    
                try {
    //                i = i + 1;
    //                System.out.println("Task allocation start: "+i);
                    runTaskAllocationAlgorithm();
    //                System.out.println("Task allocation end: "+i);
                } catch (SensorException e) {
                    throw new RuntimeException(e);
                }
    
            });
    
        }
    
        public void runTaskAllocationAlgorithm() throws SensorException {
    
            // REAL ALGORITHM STARTS HERE
            if (state == robotState.RUN){
    
                RGBColorType detectedColor = colorSensor.getColor();
    
                clusterBehaviours.observe(detectedColor, this.taskDemandQueue, this.taskSupplyQueue, fixedQueueLength, robotId, this.robotMqttClient);
    
                float[] taskDemands = clusterBehaviours.evaluateTaskDemand(this.taskDemandQueue, fixedQueueLength, robotId);
                this.estimatedTaskDemandForRed = taskDemands[0];
                this.estimatedTaskDemandForBlue = taskDemands[1];
    
                float[] taskSupplies = clusterBehaviours.evaluateTaskSupply(this.taskSupplyQueue, fixedQueueLength, robotId);
                this.estimatedTaskSupplyForRed = taskSupplies[0];
                this.estimatedTaskSupplyForBlue = taskSupplies[1];
    
    
                List<Object> outputs = clusterBehaviours.selectTask(this.responseThresholdRed,this.responseThresholdBlue,scalingFactor,this.estimatedTaskDemandForRed,this.estimatedTaskSupplyForRed
                ,this.estimatedTaskDemandForBlue,this.estimatedTaskSupplyForBlue,n,robotId,this.selectedTask);
    
                selectedTask = (String) outputs.get(0);
                this.responseThresholdRedNext = (float) outputs.get(1);
                this.responseThresholdBlueNext = (float) outputs.get(2);
                this.taskSelectionProbabilityRed = (float) outputs.get(3);
                this.taskSelectionProbabilityBlue = (float) outputs.get(4);
    
                this.timeStep = this.timeStep + 1;
                 long endTime = System.currentTimeMillis(); // Record the end time
                 long elapsedTime = endTime - startTime; // Calculate the elapsed time in milliseconds
                 double[] values = {
                     this.robotId,
                     elapsedTime,
    //                     this.timeStep,
                     this.responseThresholdRed,
                     this.responseThresholdBlue,
                     this.estimatedTaskDemandForRed,
                     this.estimatedTaskDemandForBlue,
                     this.estimatedTaskSupplyForRed,
                     this.estimatedTaskSupplyForBlue,
                     this.taskSelectionProbabilityRed,
                     this.taskSelectionProbabilityBlue,
                 };
    
                 CsvRecorder.writeRecordToCSV("src/main/java/csvRecorder/record.csv", values, selectedTask);
    
                this.responseThresholdRed = this.responseThresholdRedNext;
                this.responseThresholdBlue = this.responseThresholdBlueNext;
    
                atomicBehaviours.showSelectedTask(selectedTask,this.neoPixel,this.simpleComm,robotId);
                delay(2000); // time interval
    
                
            }
        }
        public void communicationInterrupt(String msg) {
    //        System.out.println("communicationInterrupt on " + id + " with msg: " + msg);
            // check if msg is NOT from the robot itself. Msg format is "r 0" - "taskColor sourceRobotID"
            String[] parts = msg.split("\\s+");
            int sourceRobotID = Integer.parseInt(parts[1]);
            if(!(sourceRobotID ==this.robotId)){
                // update supply queue
                clusterBehaviours.addSupply(parts[0],this.taskSupplyQueue,fixedQueueLength);
            }
    
        }
    
    }
`,
  },

  {
    name: "Obstacle Avoidance",
    className: "ObstacleAvoidanceRobot",
    code: `// This robot will move freely, avoiding obstacles 
    // Written by Nuwan Jaliyagoda 
    
    package Robots;
    
    import swarm.robot.VirtualRobot;
    import swarm.robot.sensors.DistanceSensor;
    import swarm.robot.types.ProximityReadingType;
    import swarm.behaviours.atomicBehaviours.AtomicBehaviours;
    
    import java.util.concurrent.ExecutorService;
    import java.util.concurrent.Executors;
    import java.util.concurrent.Future;
    
    public class ObstacleAvoidanceRobot extends VirtualRobot {
    
        // The minimum distance that robot tries to keep with the obstacles
        private int distanceThreshold = 30;
        private int moveBackDistanceThreshold = 20;
        private int sideDistanceThreshold = 25;
    
        // The default movement speed
        private int defaultMoveSpeed = 100;
    //    ExecutorService executor = Executors.newFixedThreadPool(1);
    
        int j = 0;
    
        public ObstacleAvoidanceRobot(int id, double x, double y, double heading) {
            super(id, x, y, heading);
        }
    
        public void setup() {
    
            super.setup();
    
        }
    
        @Override
        public void loop() throws Exception {
            super.loop();
    //        runObstacleAvoidanceWithRandomMove();
            action1Future = executor.submit(() -> {
                try {
    //                j = j + 1;
    //                System.out.println("Obs avoid start: "+j);
                    runObstacleAvoidanceWithRandomMove();
    //                System.out.println("Obs avoidance end: "+j);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            });
    
        }
    
        public void runObstacleAvoidanceWithRandomMove() throws Exception{
    
            if (state == robotState.RUN) {
                int F_DIST , LB_DIST, L_DIST, R_DIST, RB_DIST;
    
                int[] readings = proximitySensor.getProximity().getReadings();
                F_DIST = readings[2];
                LB_DIST = readings[0];
                L_DIST = readings[1];
                R_DIST = readings[3];
                RB_DIST = readings[4];
    
    
    
                if (F_DIST < distanceThreshold || L_DIST < distanceThreshold || R_DIST<distanceThreshold) {
    
                    // moveback if there is space in the back (right & left)
                    if (RB_DIST > moveBackDistanceThreshold && LB_DIST > moveBackDistanceThreshold ) {
                        AtomicBehaviours.moveBack(motion, 100, 400);
                    }
    
                    ProximityReadingType prox = proximitySensor.getProximity();
    
                    int Left = prox.getReadings()[1];
                    int Right = prox.getReadings()[3];
    
                    int sign ;
                    int random = -1000 + ((int) ((Math.random() * 2000)));
    
                    // determine turning side based on the distance on both sides
                    if(Left > sideDistanceThreshold) sign = 1;
                    else if(Right > sideDistanceThreshold) sign = -1;
                    else sign = (random % 2 == 0) ? 1 : -1;
    
                    // rotate
                    int loopCount = 0;
                    while (distSensor.getDistance() < 20 - 8 && loopCount < 5) {
                        // Maximum 5 tries to rotate and find a obstale free path
                        AtomicBehaviours.turn(motion,  defaultMoveSpeed* 0.65, sign, 1000);
                        loopCount++;
                    }
    
                    // rotate a little more
                    AtomicBehaviours.turn(motion,  defaultMoveSpeed* 0.75, sign, 500);
    
    
                } else {
                    AtomicBehaviours.moveForward(motion, defaultMoveSpeed, 1000);
                }
            }
    
        }
    }`,
  },
];
