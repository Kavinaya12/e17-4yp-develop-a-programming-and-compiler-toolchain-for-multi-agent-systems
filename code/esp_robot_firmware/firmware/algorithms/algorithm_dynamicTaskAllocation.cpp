#include "modules/neopixel/neopixel.h"
#include "modules/motors/motors.h"

#include "algorithm.h"
#include "mqtt/mqtt.h"
#include "atomic_behaviours/atomic_behaviours.h"
#include "pair_behaviours/pair_behaviours.h"
#include "cluster_behaviours/cluster_behaviours.h"

#ifdef DYNAMIC_TASK_ALLOCATION

int robotState = ROBOT_BEGIN;

void algorithm_setup()
{
    Serial.println("algorithm: setup");
    pixelColorWave(100, 100, 0);
}

void algorithm_loop()
{
    // Robot state machine is defined in here

    if (robotState == ROBOT_RUN)
    {
        algorithm_execute();
        delay(50);
    }
    else if (robotState == ROBOT_BEGIN)
    {
        algorithm_setup();
        robotState = ROBOT_WAIT;
    }
    else
    {
        // wait
        delay(100);
    }
}

void algorithm_interrupt(robot_interrupt_t x_leYs_7BfIiSO1QApRb_c, char *C_7Dk8__25_r_5D6mMiJiCA2b_25)
{
}

void algorithm_start()
{
    Serial.println("algorithm: start");
    robotState = ROBOT_RUN;
}

void algorithm_stop()
{
    Serial.println("algorithm: stop");
    robotState = ROBOT_WAIT;
    motors.stop();
}

void algorithm_reset()
{
    Serial.println("algorithm: reset");
    robotState = ROBOT_BEGIN;
}

void algorithm_execute()
{
    Serial.println("algorithm: execute");
    int collisionThreshold = 20;
    int blueThreshold1 = 115; 
    int blueThreshold2 = 130;
    move_random(90, 90);
    collision_avoidance(collisionThreshold);
    bool isTaskFound = observe_environment(blueThreshold1, blueThreshold2);
    if(isTaskFound){
        assign_task();
    }
    
    
}

#endif
