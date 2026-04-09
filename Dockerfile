FROM node:16.16-alpine3.16
RUN mkdir -p /srv/app
COPY . /srv/app
WORKDIR /srv/app
# Install production dependencies
RUN npm install --production
# Expose port for access outside of container
ENV PORT 4000
EXPOSE $PORT
CMD ["node", "index.js"]