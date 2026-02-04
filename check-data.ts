
import { teamMembers } from './src/data/teamData';

console.log("Team Members count:", teamMembers.length);
teamMembers.forEach(m => console.log(`- ${m.name}: Online=${m.isOnline}`));

const onlineMembers = teamMembers.filter(m => m.isOnline);
console.log("Online Members count:", onlineMembers.length);
