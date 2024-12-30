<h1 align="center">XSwap</h1>

<br />

To run the project, you need to perform the following steps:

```bash
cd frontend
```

<br />

Update the env file with the following params:

```bash
NEXT_PUBLIC_REOWN_PROJECT_ID="" # See -> https://cloud.reown.com/
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000" # or http://ec2-3-109-56-241.ap-south-1.compute.amazonaws.com -> current live server
```

<br />

Then run the following command to install the dependencies:

```bash
npm run install
```

<br />

Finally, run the following command to start the development server:

```bash
npm run dev
```

<br/>

To run the backend server, you need to perform the following steps:

```bash
cd backend
```

<br />

Update the env file with the following params:

```bash
PROVIDER_URL="https://arbitrum.rpc.subquery.network/public" # or any other paid provider such as alchemy quicknode etc
```

<br />

Then run the following command to install the dependencies:

```bash
npm run install
```

<br />

Finally, run the following command to start the development server:

```bash
npm run dev
```
