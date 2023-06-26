FROM rcc-image
COPY ./ /src

EXPOSE 5001

WORKDIR /src
CMD [ "node", "app.js" ]
