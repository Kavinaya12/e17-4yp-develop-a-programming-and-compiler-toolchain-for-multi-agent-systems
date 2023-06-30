#include "pair_behaviours.h"
#include "modules/neopixel/neopixel.h"
#include "mqtt/mqtt.h"

void collision_avoidance(){
    int d = distance_read();
    Serial.printf("algo_dist: %d\n", d);
    if (d<=20){
        // to move back
        motors.stop();
        move_random(150 * -1, 150 * -1);
        delay(500);
        // Random turn
        random_turn(60, 1000);
    }
}
