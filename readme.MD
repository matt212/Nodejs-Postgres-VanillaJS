**Custom fractural pattern based app** :

> things which are plug and play

- new fields (datatypes string and ints ) ,
  config based modular apporach on server side `duh`.
- validation is sly-ly implemented taken care by config based modular apporach on client side.
- <u> `modulerized everything baby` </u> concept for excel export ,import table rendering and dynamic pivot based filters !
- create, update , delete. search is implemented for single table and complex queries multi join alias based approach queries.
- every thing search, group by multiselect search is paginated to the core for effeciency and scalabliltiy.which goes without sayin is modulerized to the core .
- single set depenendences routes wherein all dependencies are imported from dependencies core.
  > **_The essence is request and response structure which in turn is based on fractural pattern which is fuel for this custom ad -hoc
  > fractural beast of an app_**.

> oOh, I forgot stream based realtime **_1000k_** yup you read that right **_1000k_** with bare minimum hardware pick any lowest minimum droplet (digitalocean), aws instance for more or less $5 a months and this ground up platform works seamlessly due to fine tune architecture over period of time  
>
> - record **_E_** import, export ,
>   **_TL_**(pivot , search multiselect multicolumn)
>   applications anything from
>   custom b2b app like crm etc .



* ### `basic dashboard operation`

![redlime](app/video/gif/a.gif)

* ### `dynamic pivot operation with highchart implementation`

![redlime](app/video/gif/b.gif)

*  ### `Node.js stream based CSV download for 1000k from PostgresSQL with socket.io as progress feature`
![redlime](app/video/gif/c.gif)

**sh file Setup**
> *`chmod +x ./app/utils/serverSetup/primarySetup.sh `*  

> *`sed -i -e 's/\r$//' ./app/utils/serverSetup/> primarySetup.sh`*

>*`chmod +x ./app/utils/serverSetup/secondarySetup.sh`*

>*`sed -i -e 's/\r$//' ./app/utils/serverSetup/secondarySetup.sh`*

>*`bash ./app/utils/serverSetup/primarySetup.sh`*

**app setup**
> **node and postgres**
>*`bash ./app/utils/serverSetup/primarySetup.sh`*


>*`bash ./app/utils/serverSetup/secondarySetup.sh`*


