#include "cluster_behaviours.h"
#include "modules/neopixel/neopixel.h"
#include "mqtt/mqtt.h"

struct Color obsColor2;

bool observe_environment(){
    color_read(&obsColor2);
    // if blue object found
    if (obsColor2.B >= 115 && obsColor2.R <= 130){
        return true;
    }
    return false;
}