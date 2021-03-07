FROM public.ecr.aws/lambda/nodejs:14

RUN npm i -g yarn

COPY . /var/task/

RUN yarn install

CMD [ "app.handler" ]
