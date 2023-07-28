#include "cluster_behaviours.h"
#include "modules/neopixel/neopixel.h"
#include "mqtt/mqtt.h"

struct Color obsColor2;

bool observe_environment(int blueThreshold1, int blueThreshold2){
    // int d = distance_read();
    // if (d <= collisionThreshold){
    color_read(&obsColor2);
    // if blue object found
    if (obsColor2.B >= blueThreshold1 && obsColor2.R <= blueThreshold2){
        return true;
    }
    // }
    
    return false;
}