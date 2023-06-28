#include "modules/neopixel/neopixel.h"
#include "modules/motors/motors.h"

#include "algorithm.h"
#include "mqtt/mqtt.h"
#include "atomic_behaviours/atomic_behaviours.h"

#ifdef MOVE_DISPLAY_OBJ_COLOR

int robotState = ROBOT_BEGIN;
struct Color obsColor;

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

    int d = read_distance();
    if (d <= 15)
    {

        read_color(&obsColor);

        if (obsColor.B >= 115 && obsColor.R <= 130)
            pixelColorWave(0, 0, 255);

        else if (obsColor.R >= 130 && obsColor.B >= 100 && obsColor.B <= 115)
            pixelColorWave(255, 0, 0);

        else
        {
            // Go back for 1 second
            move_back(150, 150, 1000);

            // Random turn
            random_turn(60, 1000);
        }
    }
    else
    {
        random_movement(150, 150, 1000);
    }
}

#endif
