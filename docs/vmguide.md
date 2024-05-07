# VM usage

Run in terminal all commands below:

Connect to vm:

```
ssh [din feide bruker]@it2810-37.idi.ntnu.no
```

(type "yes" if first time)

then type your feide password

Set up git (will have to type in credentials once username + access token):

```
sudo git config --global credential.helper store
```

clone repo:

```
sudo git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-37/prosjekt-2.git
```

now we make a script to do work for us, from ~/ write:

```
sudo touch 2-deploy.sh
sudo chmod +x 2-deploy.sh
sudo nano 2-deploy.sh
```

in nano copy in the following:

```
#!/bin/bash
cd prosjekt-2
sudo git pull
sudo git reset origin/main --hard
sudo git pull
cd frontend
sudo npm install
sudo rm src/App.tsx
sudo cat >> src/App.tsx << EOF
import Router from "./Router";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { RecoilRoot } from "recoil";

const client = new ApolloClient({
  uri: "http://it2810-37.idi.ntnu.no:9090/",
  cache: new InMemoryCache()
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <RecoilRoot>
                <Router />
            </RecoilRoot>
        </ApolloProvider>
    );
};

export default App;

EOF
sudo npm run build
sudo rm -rf /var/www/html/project2
sudo mkdir /var/www/html/project2
sudo cp -R dist/* /var/www/html/project2
sudo service apache2 restart
cd ../backend
sudo npm install
sudo docker compose up -d
sudo npx prisma migrate dev
node scripts/fixtures.js
sudo killall node
sudo npm start &
```

save with Ctrl+S and exit with Ctrl+X

Now every time you want to refresh the contents of server run `sudo ./2-deploy.sh` from ~/ directory if prompted by prisma migrate press yes and enter a name for the migration if needed.

Access site at: [http://it2810-37.idi.ntnu.no/project2/](http://it2810-37.idi.ntnu.no/project2/)
