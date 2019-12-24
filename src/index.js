import {User} from './models/user';


for(let i = 0; i <= 500; i++) {
  const user = new User();
  
  user.sendViewPage();
  user.startOnFocus();
}
