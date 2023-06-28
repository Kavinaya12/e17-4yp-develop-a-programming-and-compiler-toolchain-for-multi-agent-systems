#include "modules/neopixel/neopixel.h"
#include "mqtt/mqtt.h"
#include "atomic_behaviours.h"

int read_distance()
{
    motors.stop();
    int d = distance_read();
    Serial.printf("algo_dist: %d\n", d);
    return d;
}
