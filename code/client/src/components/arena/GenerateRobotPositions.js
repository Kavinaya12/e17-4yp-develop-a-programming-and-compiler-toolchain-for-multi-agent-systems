// Function to generate random positions for the robots
export const generateRobotPositions = (selectedArena, robotCount) => {
  const positions = [];
  const minDistanceFromBoundary = 10;

  for (let i = 0; i < robotCount; i++) {
    let validPosition = false;
    let x, y;

    // Generate a valid position for each robot
    while (!validPosition) {
      x =
        Math.random() *
          (selectedArena.arena?.xMax -
            selectedArena.arena?.xMin -
            2 * minDistanceFromBoundary) +
        selectedArena.arena?.xMin +
        minDistanceFromBoundary;
      y =
        Math.random() *
          (selectedArena.arena?.yMax -
            selectedArena.arena?.yMin -
            2 * minDistanceFromBoundary) +
        selectedArena.arena?.yMin +
        minDistanceFromBoundary;

      // Check for collisions with walls and cylinders
      const isCollision = selectedArena?.obstacles?.some((obstacle) => {
        if (obstacle.type === "wall") {
          return (
            x >= obstacle.parameters.x &&
            x <= obstacle.parameters.x + obstacle.parameters.width &&
            y >= obstacle.parameters.y &&
            y <= obstacle.parameters.y + obstacle.parameters.height
          );
        } else if (obstacle.type === "cylinder") {
          const distance = Math.sqrt(
            Math.pow(x - obstacle.parameters.x, 2) +
              Math.pow(y - obstacle.parameters.y, 2)
          );
          return distance <= obstacle.parameters.radius;
        }
        return false;
      });

      // If no collision, add the position to the list
      if (!isCollision) {
        validPosition = true;
        positions.push({
          vRobotId: i,
          xCoordinate: x,
          yCoordinate: y,
          heading: Math.random() * 360,
        });
      }
    }
  }
  return positions;
};
