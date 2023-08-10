#include "algorithm.h"

#include "modules/neopixel/neopixel.h"

#include "config/global_variables.h"
#include "mqtt/mqtt.h"
#include "sensors/infared/infared.h"

#ifdef ALGO_INFRARED_TEST
// -----------------------------------------------------------------------------

int robotState = ROBOT_BEGIN;

// Define your global variables here -----

int i = 100;

// ---------------------------------------

void algorithm_setup()
{
    Serial.println("algorithm: setup");
    // Define what need to be setup in here...
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

void algorithm_interrupt(robot_interrupt_t interrupt, char *msg)
{
    // Define Interrupt Handlers in here

    if (interrupt == INT_COMM_IN)
    {
        // Communication Interrupt
    }
}

void algorithm_execute()
{
    // Deine the algorithm in here...
    Serial.println("Sending IR Signal...");
    int valueToSend = 8;
    send(valueToSend);

    delay(2000); // Wait for 2 seconds

    // Receiving IR Signal
    // unsigned int receivedValue = 0;
    // Serial.println("Receiving IR Signal...");
    // while (receivedValue == 0)
    // {
    //     // Wait until an IR signal is received
    //     receivedValue = irReceive_0(reinterpret_cast<uint32_t *>(&receivedValue), 2);
    // }

    // // Print the received value
    // Serial.print("Received Value: 0x");
    // Serial.println(receivedValue, HEX);
}

// instruct to start the pattern
void algorithm_start()
{
    robotState = ROBOT_RUN;
    Serial.println("algorithm: start");
    // Define the tasks to be done at the start of the algorithm in here...
}

void algorithm_reset()
{
    // Define the tasks to be done at reset in here...

    robotState = ROBOT_BEGIN;
    pixelShowColor(0, 0, 0);
    Serial.println("algorithm: reset");
}

void algorithm_stop()
{
    // Define the tasks to be done to stop an algorithm in here...

    robotState = ROBOT_WAIT;
    Serial.println("algorithm: wait");
}

#endif
