# Use a base image with OpenJDK and Maven pre-installed
FROM maven:3.8.4-openjdk-11 AS builder

# Set the working directory for the builder stage
WORKDIR /src

# Copy the entire project source code to the builder stage
COPY ./java_virtual_robot/robot-library-java /src

# Build the Java project using Maven
RUN mvn -f /src/pom.xml clean install

# Create the final image
FROM ubuntu:20.04

RUN apt-get update && apt-get install -y openjdk-11-jdk

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

RUN apt-get update -y
RUN apt-get install -y python3
RUN apt-get install -y python3-venv
RUN apt-get install -y curl
RUN curl -fsSL https://raw.githubusercontent.com/platformio/platformio-core-installer/master/get-platformio.py -o get-platformio.py
RUN python3 get-platformio.py
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g nodemon

# Install Maven 3.8.4
RUN mkdir -p /opt/maven
WORKDIR /opt/maven
RUN curl -fsSL https://dlcdn.apache.org/maven/maven-3/3.8.8/binaries/apache-maven-3.8.8-bin.tar.gz | tar xz --strip-components=1
ENV PATH="/opt/maven/bin:$PATH"

RUN mkdir -p /usr/local/bin
RUN ln -s ~/.platformio/penv/bin/platformio /usr/local/bin/platformio
RUN ln -s ~/.platformio/penv/bin/pio /usr/local/bin/pio
RUN ln -s ~/.platformio/penv/bin/piodebuggdb /usr/local/bin/piodebuggdb

RUN pio pkg install -g --tool "platformio/tool-esptoolpy@1.20600.0"
# RUN pio pkg install -g --tool "platformio/tool-mkspiffs@^2.230.0"
RUN pio pkg install -g --tool "platformio/toolchain-xtensa32@^2.50200.97"
RUN pio pkg install -g --tool "platformio/framework-arduinoespressif32@3.10004.210126"
RUN pio pkg install -g --platform "platformio/espressif32@2.0.0"

# Copy the built JAR file from the builder stage
COPY --from=builder /src/target/java-robot-1.0.2.jar /app/

# Copy the Node.js application and other files
COPY ./ /app/

EXPOSE 5001

WORKDIR /app
CMD [ "node", "app.js" ]