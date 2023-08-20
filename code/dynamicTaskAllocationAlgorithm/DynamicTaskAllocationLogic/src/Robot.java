import java.util.Collections;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Random;

public class Robot {
    Queue<String> taskDemandQueue = new LinkedList<>();
    Queue<String> taskSupplyQueue = new LinkedList<>();
    static int fixedQueueLength = 20;
    static double scalingFactor = 0.015;
    static int n = 10; // steepness of task selection probability
    float responseThresholdRed;
    float responseThresholdBlue;
    float estimatedTaskDemandForRed;
    float estimatedTaskDemandForBlue;
    float estimatedTaskSupplyForRed;
    float estimatedTaskSupplyForBlue;
    float taskSelectionProbabilityRed;
    float taskSelectionProbabilityBlue;
    String selectedTask;

    Robot(){

        // assign initial random thresholds
        Random rand = new Random();

        this.responseThresholdRed = rand.nextFloat();
        this.responseThresholdBlue = rand.nextFloat();

        // initially assign task Red
        selectedTask = "r";

        System.out.println("Robot initially set to task: "+ selectedTask);
        System.out.println("Robot initially assigned random threshold values: r: "+ responseThresholdRed + "  b: "+ responseThresholdBlue);
    }

    public void addDemand(String colourOfObject){

        int lengthOfDemandQueue = taskDemandQueue.size();
        if(lengthOfDemandQueue<fixedQueueLength){
            taskDemandQueue.add(colourOfObject);
        }else{
            taskDemandQueue.remove();
            taskDemandQueue.add(colourOfObject);
        }

    }

    public void addSupply(String colourOfRobot){

        int lengthOfSupplyQueue = taskSupplyQueue.size();
        if(lengthOfSupplyQueue<fixedQueueLength){
            taskSupplyQueue.add(colourOfRobot);
        }else{
            taskSupplyQueue.remove();
            taskSupplyQueue.add(colourOfRobot);
        }

    }

    // observe method will populate the taskDemand and taskSupply queues
    public void observe(){ // should I remove while loop and two second delay from here?

        System.out.println();

        Random random1 = new Random();
        Random random2 = new Random();
        String[] colour = {"r", "b"};

        // if object is detected from colour sensor reading - code
        if(random1.nextBoolean()){
            // String colourOfDetectedObject = "r"; // hardcoded
            String colourOfDetectedObject = colour[random2.nextInt(2)]; // randomly choose r or b
            addDemand(colourOfDetectedObject);

            System.out.println(colourOfDetectedObject+ " Object detected. Demand queue updated as below.");
            for (String item: taskDemandQueue) {
                System.out.print(item + " ");
            }
            System.out.println();
        }

        // if a neighbouring robot sends task detail - code
        if(random1.nextBoolean()){
            // String colourOfNeighbourRobot = "r"; // hardcoded
            String colourOfNeighbourRobot = colour[random2.nextInt(2)]; // randomly choose r or b
            addSupply(colourOfNeighbourRobot);

            System.out.println(colourOfNeighbourRobot+ " Robot detected. Supply queue updated as below.");
            for (String item: taskSupplyQueue) {
                System.out.print(item + " ");
            }
            System.out.println();
        }
    }

    public void evaluateTaskDemand(){


        if(!taskDemandQueue.isEmpty()){

            // Red Task
            estimatedTaskDemandForRed = (float) (Collections.frequency(taskDemandQueue, "r")) /(fixedQueueLength);
            System.out.println("Task demand for red calculated: "+ estimatedTaskDemandForRed);
            // Blue Task
            estimatedTaskDemandForBlue = (float) (Collections.frequency(taskDemandQueue, "b")) /(fixedQueueLength);
            System.out.println("Task demand for blue calculated: "+ estimatedTaskDemandForBlue);
        }

    }

    public void evaluateTaskSupply(){

        if(!taskSupplyQueue.isEmpty()){

            // Red Task
            estimatedTaskSupplyForRed = (float) (Collections.frequency(taskSupplyQueue, "r")) /(fixedQueueLength);
            System.out.println("Task supply for red calculated: "+ estimatedTaskSupplyForRed);
            // Blue Task
            estimatedTaskSupplyForBlue = (float) (Collections.frequency(taskSupplyQueue, "b")) /(fixedQueueLength);
            System.out.println("Task supply for blue calculated: "+ estimatedTaskSupplyForBlue);
        }

    }

    public void selectTask(){

        // calculate new response threshold for Red
        responseThresholdRed = (float) (responseThresholdRed - (scalingFactor * (estimatedTaskDemandForRed - estimatedTaskSupplyForRed)));
        // calculate new response threshold for Blue
        responseThresholdBlue = (float) (responseThresholdBlue - (scalingFactor * (estimatedTaskDemandForBlue - estimatedTaskSupplyForBlue)));

        // calculate task selection probability for Red
        taskSelectionProbabilityRed = (float) ((Math.pow(estimatedTaskDemandForRed, n))/(Math.pow(estimatedTaskDemandForRed, n) + Math.pow(responseThresholdRed, n)));
        System.out.println("Task selection probability for red calculated: "+ taskSelectionProbabilityRed);

        // calculate task selection probability for Blue
        taskSelectionProbabilityBlue = (float) ((Math.pow(estimatedTaskDemandForBlue, n))/(Math.pow(estimatedTaskDemandForBlue, n) + Math.pow(responseThresholdBlue, n)));
        System.out.println("Task selection probability for blue calculated: "+ taskSelectionProbabilityBlue);

        if(taskSelectionProbabilityRed < taskSelectionProbabilityBlue){
            selectedTask = "b";
        }else if(taskSelectionProbabilityBlue < taskSelectionProbabilityRed){
            selectedTask = "r";
        }
        System.out.println("Robot selected task: "+ selectedTask);
        System.out.println();
    }



}
