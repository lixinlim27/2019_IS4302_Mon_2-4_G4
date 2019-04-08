# HealthChain

## Overview
HealthChain is a Blockchain-based solution for the healthcare industry. It is built on the permissioned Hyperledger Fabric to ensure security, privacy, provenance and immutability.

## Getting Started

### Hyperledger setup
Follow the steps in https://github.com/suenchunhui/easy-hyperledger-composer to start the hyperledger setup.
<br>
Download the vagrant environment.

### Vagrantfile setup
Amend as follow to map participants to the respective ports in the vagrantfile. Ports required are from 3001-3008.
```
  ...
  config.vm.network :forwarded_port, guest: 8080, host: 8080  #composer
  config.vm.network :forwarded_port, guest: 8001, host: 8001  #reverse-proxy
  config.vm.network :forwarded_port, guest: 8181, host: 8181  #cloud9-ide
  config.vm.network :forwarded_port, guest: 9090, host: 9090  #custom-ui
  
  #rest-server
  config.vm.network :forwarded_port, guest: 3001, host: 3001  #doctor1
  config.vm.network :forwarded_port, guest: 3002, host: 3002  #doctor2
  config.vm.network :forwarded_port, guest: 3003, host: 3003  #admin1
  config.vm.network :forwarded_port, guest: 3004, host: 3004  #admin2
  config.vm.network :forwarded_port, guest: 3005, host: 3005  #patient1
  config.vm.network :forwarded_port, guest: 3006, host: 3006  #patient2
  config.vm.network :forwarded_port, guest: 3007, host: 3007  #insuranceCompany1
  config.vm.network :forwarded_port, guest: 3008, host: 3008  #insuranceCompany2
  ...
 ```
### 1. Start vagrant
```bash
cd to ~/easy-hyperledger-composer
vagrant up
```
Access to Cloud9 IDE which is available at "http://localhost:8181" 

### 2. Deploy Hyperledger Composer
```bash
  npm run clean_network
  npm run build_image            #build images (only needs to be run once ever)
  npm run setup_crypto           #setup crypto and config materials for fabric
  npm run start_fabric           #setup all fabric docker containers
  npm run start_playground       #start hyperledger composer
```

#### a. Access to Composer Playground which is available at "http://localhost:8080" <br>
#### b. Deploy the healthchain.bna file <br>
#### c. Create Test Data: <br>
```
  In the Test Tab, copy and paste the data according to "testData.txt" to instantiate participants and assets. 
  
  (a) directly create
      - Hospital
      - Administrator
      - Doctor
      - Patient
      - InsuranceCompany
  
  (b) submit transaction to create
      - Drug
      - Prescription Record
      - Medical Record
      - Invoice
      - Medical Access Request
      - Insurance Claim
      - Insurance Record
```
#### d. Issue Identities: <br>
```
  Create composer credentials for each participant, using the ID name stated respectively. 
  - doctor1
  - doctor2
  - admin1
  - admin2
  - patient1
  - patient2
  - insuranceCompany1
  - insuranceCompany2
```

### 3. REST server
Run the following commands
```bash
npm run start_rest-server doctor1@healthchain-business-network 3001
npm run start_rest-server doctor2@healthchain-business-network 3002
npm run start_rest-server admin1@healthchain-business-network 3003
npm run start_rest-server admin2@healthchain-business-network 3004
npm run start_rest-server patient1@healthchain-business-network 3005
npm run start_rest-server patient2@healthchain-business-network 3006
npm run start_rest-server insuranceCompany1@healthchain-business-network 3007
npm run start_rest-server insuranceCompany2@healthchain-business-network 3008
```

### 4. HealthChain Application server
```bash
cd to express_server
npm init
npm install express express-http-proxy --save
```
#### Setup the folder as follows: <br>
![Capture](https://user-images.githubusercontent.com/48654189/55737083-23c0c000-5a57-11e9-9c31-54b89cbb6b5d.PNG)


`node server.js`

#### a. Access to Healthchain application which is available at http://localhost:8001 <br>
#### b. Login to the website with the following credentials. <br>
```
Usernames:
  In the dropdown list, select role "DOCTOR"
    - Doctor1
    - Doctor2
  In the dropdown list, select role "ADMINISTRATOR"
    - Admin1
    - Admin2
  In the dropdown list, select role "PATIENT"
    - Patient1
    - Patient2
  In the dropdown list, select role "INSURANCECOMPANY"
    - InsuranceCompany1
    - InsuranceCompany2
Passwords:
    (Password can be omitted)
```
### Stop Network
```bash
  npm run stop_playground 
  npm run stop_fabric 
  npm run clean_network 
```
## Components
 > The blockchain component : Hyperledger Composer.
 > The middleware component : Node.js 
 > The user interface : Bootstrap, Angular

