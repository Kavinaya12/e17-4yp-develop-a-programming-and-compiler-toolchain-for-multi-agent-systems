---
layout: home
permalink: index.html

# Please update this with your repository name and title
repository-name: e17-4yp-develop-a-programming-and-compiler-toolchain-for-multi-agent-systems
title: Programming and Compiler Toolchain for Swarm Robots
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# Programming and Compiler Toolchain for Swarm Robots

#### Team

- E/17/352, Tillekeratne L.J.I., [email](mailto:e17352@eng.pdn.ac.lk)
- E/17/398, Wijerathne I.D.H.S.D., [email](mailto:e17398@eng.pdn.ac.lk)
- E/17/159, Kavinaya Y., [email](mailto:e17159@eng.pdn.ac.lk)

#### Supervisors

- Dr. Isuru Nawinne, [email](mailto:isurunawinne@eng.pdn.ac.lk)
- Dr. Mahanama Wickramasinghe, [email](mailto:mahanamaw@eng.pdn.ac.lk)
- Prof. Roshan Ragel, [email](mailto:roshanr@eng.pdn.ac.lk)

#### Table of content

1. [Abstract](#abstract)
2. [Related works](#related-works)
3. [Methodology](#methodology)
4. [Experiment Setup and Implementation](#experiment-setup-and-implementation)
5. [Results and Analysis](#results-and-analysis)
6. [Conclusion](#conclusion)
7. [Publications](#publications)
8. [Links](#links)

---

## Abstract

This research aims to create an Integrated Development Environment (IDE) for swarm robots, compatible with virtual and physical platforms. The IDE's key features include a graphical, block-based interface for high-level algorithm composition, facilitating the programming of complex swarm behaviors. It supports bottom-up design, allowing users to experiment with built-in behaviors and program new ones. Specialized support includes random movement, obstacle avoidance, task allocation, and object finding. The IDE automates the conversion of graphical algorithms to C++ and Java, enabling compilation and execution on both virtual and physical swarm robot platforms which are created in the [PeraSwarm](https://pera-swarm.ce.pdn.ac.lk/) project. The user-friendly IDE streamlines the programming, compilation, and execution of diverse swarm behaviors, validated through multiple experiments.

## Related works

We conducted the literature review based on two main categories: swarm programming tools-based studies and swarm behavioural algorithms-based studies. 

#### Swarm programming tools-based studies

* **Swarm-Bench**: It is a benchmarking framework for assessing swarm intelligence algorithms, offering standardized problems and metrics for fair evaluations. It prioritizes benchmarking over algorithm implementation, necessitating additional programming for custom algorithms.

* **SwarmOps**: SwarmOps is a Python library for swarm intelligence optimization, featuring algorithms like PSO and DE. It emphasizes flexibility, customization, and experimentation.

* **PySwarm**: PySwarm is a Python library specializing in PSO algorithms, offering a simple interface for experimentation with customization options. It is less comprehensive than some other libraries and, like SwarmOps, is specific to swarm intelligence optimization algorithms.
  
* **SwarmLib**: SwarmLib is a Java library for swarm intelligence algorithms, encompassing techniques like PSO, ACO, and ABC. It caters to researchers and developers, but, being a presentation tool, is limited to pre-programmed swarm behaviors and lacks support for real robot systems.

* **Physicomimetics**: Physicomimetics, in implementing swarm behaviors, employs a virtual physics framework to simulate collective dynamics observed in natural swarms. Combining physics and biology principles, it replicates emergent properties and behaviors. The framework, limited to predefined rules, simulates specific behaviors but may lack adaptability to dynamic real-world swarm conditions.
  
* **Buzz**: Buzz is a Domain-specific language (DSL) and simulation framework for swarm robotics, offering high-level language and a simulator for algorithm testing. It's hardware-independent with top-down primitives like Swarm, Neighbours, and Virtual Stigmergy, addressing hardware dependency with the BuzzVM virtual machine. While it supports coordination and communication for complex collective behaviors, it has a steep learning curve due to the DSL aspect.

* **Actor-based programming framework**: The Actor-based programming framework, adopting a bottom-up design, simplifies swarm behavior programming by providing common functionalities and a high-level abstraction called "Actor." This abstraction manages collective behaviors, representing different groups. The framework also uses a domain-specific language (DSL) for programming Actor-based tasks, implemented in C++. Although lacking visual programming, it aligns with the goal of enabling developers to focus on complex swarm behaviors without dealing with low-level complexities.

* **iRobot**: iRobot engages in swarm robotics research, emphasizing coordination among large robot groups using a decentralized, bottom-up approach. This involves individual agents interacting locally based on simple rules, without centralized control. Applied in domains like search and rescue and environmental monitoring, this strategy enhances efficiency and effectiveness in task accomplishment.

#### Swarm behavioural algorithms-based studies

Some of the swarm behaviours that we encountered during our literature review are listed below. Under each behaviour, several studies were analysed.

* **Flocking**: Flocking behavior mimics the movement of natural flocks, such as birds or schools of fish. It involves agents aligning their velocities, maintaining cohesion, and avoiding collisions. The result is a cohesive and coordinated movement of the entire swarm.

* **Pattern formation**: Pattern formation refers to the ability of a swarm to self-organize into specific shapes or arrangements. This behavior involves agents adjusting their positions relative to each other to create predefined patterns, which can be useful in tasks like environmental monitoring or area coverage.

* **Object searching**: In object searching behavior, the swarm of robots collaboratively explores an environment to locate specific objects. This may involve systematic exploration strategies or communication among agents to efficiently cover the search space and share information about discovered objects.
  
* **Repulsion-Attraction for foraging**: In foraging behavior, robots search for and collect resources distributed in the environment. Repulsion-attraction mechanisms involve agents being repelled by obstacles or other agents while being attracted to resources. This dual mechanism helps in navigating around obstacles and efficiently locating and collecting resources.

* **Dynamic task allocation**: Dynamic task allocation involves the real-time assignment of tasks to individual robots based on changing environmental conditions or task requirements. This behavior allows the swarm to adapt to dynamic situations, redistributing tasks among robots to optimize overall performance and achieve efficient task completion.

#### Problems identified

* Complexity in programming swarm robots to achieve a collective behaviour
* No support for block-based visual programming in the existing tools
* Limited to software-level simulations rather than comprehensive development libraries
* Lack of support for both physical and virtual robots
* Limited to a few pre-programmed sets of behaviours & bias towards specific algorithms

## Methodology

## Experiment Setup and Implementation

## Results and Analysis

## Conclusion

## Publications
[//]: # "Note: Uncomment each once you uploaded the files to the repository"

<!-- 1. [Semester 7 report](./) -->
<!-- 2. [Semester 7 slides](./) -->
<!-- 3. [Semester 8 report](./) -->
<!-- 4. [Semester 8 slides](./) -->
<!-- 5. Author 1, Author 2 and Author 3 "Research paper title" (2021). [PDF](./). -->


## Links

[//]: # ( NOTE: EDIT THIS LINKS WITH YOUR REPO DETAILS )

- [Project Repository](https://github.com/cepdnaclk/e17-4yp-develop-a-programming-and-compiler-toolchain-for-multi-agent-systems)
- [Project Page](https://cepdnaclk.github.io/e17-4yp-develop-a-programming-and-compiler-toolchain-for-multi-agent-systems)
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

[//]: # "Please refer this to learn more about Markdown syntax"
[//]: # "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
