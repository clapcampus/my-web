// check-data.ts
import { TeamMember } from './src/types/team';

async function checkData() {
    try {
        const response = await fetch('http://127.0.0.1:8001/members');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const teamMembers: TeamMember[] = await response.json();

        console.log("Team Members count:", teamMembers.length);
        teamMembers.forEach(m => console.log(`- ${m.name}: Online=${m.isOnline}`));

        const onlineMembers = teamMembers.filter(m => m.isOnline);
        console.log("Online Members count:", onlineMembers.length);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

checkData();
