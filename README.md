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
  npm run build_image            #build images (only needs to be run once ever)
  npm run test_bna               #run embedded unittests on BNA 
  npm run setup_crypto           #setup crypto and config materials for fabric
  npm run start_fabric           #setup all fabric docker containers
  npm run build_bna healthchain.bna  #compile BNA file, and write to file(argument 1)
  npm run install_bna healthchain-business-network healthchain.bna  #deploy BNA file(arg 2) to network using name(arg 1)
  npm run start_playground       #(optional) start hyperledger composer
```
Access to Composer Playground which is available at "http://localhost:8080"

Create Test Data:
```
  In the test tab, copy and paste data according to "testData.txt"
  
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

Issue Identities:
```
  `npm run add_participant maeid1 mae@biznet.org healthchain-business-network`
  `npm run add_participant doctor1 doctor1@healthchain-business-network healthchain-business-network`
```

### 3. REST server
Run the following commands.
```bash
  `npm run start_rest-server doctor1@healthchain-business-network 3001`
  `npm run start_rest-server doctor2@healthchain-business-network 3002`
  `npm run start_rest-server admin1@healthchain-business-network 3003`
  `npm run start_rest-server admin2@healthchain-business-network 3004`
  `npm run start_rest-server patient1@healthchain-business-network 3005`
  `npm run start_rest-server patient2@healthchain-business-network 3006`
  `npm run start_rest-server insuranceCompany1@healthchain-business-network 3007`
  `npm run start_rest-server insuranceCompany2@healthchain-business-network 3008`
```

### 4. HealthChain Application server
```bash
cd to express_server
npm init
npm install express express-http-proxy --save
Setup the folder as follows:
<img>
node server.js
```
Access to Healthchain application which is available at http://localhost:8001

Usernames:
```
    Doctor1
    Doctor2
    Admin1
    Admin2
    Patient1
    Patient2
    InsuranceCompany1
    InsuranceCompany2
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
