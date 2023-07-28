#include "atomic_behaviours.h"

void move_random(int left, int right)
{
    motors.write(left, right);
}
