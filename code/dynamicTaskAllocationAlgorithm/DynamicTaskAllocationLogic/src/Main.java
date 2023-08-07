public class Main {

    public static void main(String[] args) throws InterruptedException {

        System.out.println("Robot starts running!");

        Robot taskRobot = new Robot();

        while(true){

            taskRobot.observe();
            taskRobot.evaluateTaskDemand();
            taskRobot.evaluateTaskSupply();
            taskRobot.selectTask();
            Thread.sleep(5000);
        }

    }


}