#include "atomic_behaviours/atomic_behaviours.h"

void read_color(color_t *obsColor)
{
    motors.stop();
    color_read(obsColor);
}
