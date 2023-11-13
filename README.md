___
# Develop a programming and compiler toolchain for multi agent systems
___

## Problem

We have chosen swarm robots as our Multi-Agent system. The system is homogeneous, decentralized, autonomous and follows the principle of locality. Achieving a complex swarm behaviour is a challenging task. Programming swarm robots can be tedious as it requires dealing with low-level complexities of handling and programming each robot and the interactions between the robots such that complex collective behaviours are achieved. Most of the available frameworks for swarm programming focus only on software-level simulations, which do not discuss extending them to real hardware robot platforms, and they are limited only to a few pre-programmed sets of behaviours and do not give developers the ability to change the inbuilt behaviours or use them to integrate and build new behaviours.

## Solution

We aim to develop an Integrated Development Environment (IDE) that comprises a programming and compiling toolchain for swarm robots as a multi-agent system. The IDE is developed with three main characteristics capable of addressing the mentioned complexities in swarm programming. 

1. The ability of high-level algorithm composition is the main characteristic of the proposed IDE. It allows the users to program swarm behaviours in a graphical interface in a code-less approach. The swarm behaviours are designed based on a bottom-up design approach where the users can program more complex top-level behaviours using the low-level atomic behaviours. The behaviours are categorized into multiple levels, giving the users a clear understanding of combining and scaling them up without delving into low-level details. This abstraction can help manage the complexity of programming large swarms with sophisticated swarm behaviours with less effort. 

2. The IDE automatically converts the graphical-level algorithm to a programming language which then facilitates the compilation process for creating binaries that can be executed on the robots supporting various hardware platforms. 

3. As the final characteristic, it supports uploading the binaries to the robots over the air (OTA). OTA programming refers to the ability to update or reprogram hardware devices remotely without physical access. This capability is attained by wireless communication using WiFi, MQTT messaging protocol, and a central server which enables quick deployment of updates to multiple robots simultaneously and gives higher convenience, efficiency, and flexibility.




