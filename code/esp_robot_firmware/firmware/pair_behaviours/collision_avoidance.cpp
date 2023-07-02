#include "pair_behaviours.h"
#include "modules/neopixel/neopixel.h"
#include "mqtt/mqtt.h"

void collision_avoidance(int collisionThreshold){
    int d = distance_read();
    Serial.printf("algo_dist: %d\n", d);
    if (d <= collisionThreshold){
        // to move back
        // motors.stop();
        move_random(150 * -1, 150 * -1);
        delay(1000);
        // Random turn
        // random_turn(60, 1000);
        move_random(60 * -1, 60 * 1);
        delay(1000);
        motors.stop();
    }
}
