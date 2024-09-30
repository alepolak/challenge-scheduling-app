## Getting Started

### Install the dependencies:
```bash
npm i
```

### Create local variables
Create the `.env.local` file with these variables:
```
NEXT_PUBLIC_SUPABASE_URL=`PROJECT_URL`
NEXT_PUBLIC_SUPABASE_ANON_KEY=`PROJECT KEY`
```
Shoot me an email for the `url` and the `public key` if needed. You can create your own supabase project if needed.

### Start the project
To start the proyect run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Test it
Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
Or you can test it at: [https://challenge-scheduling-app.vercel.app](https://challenge-scheduling-app.vercel.app/)

## How to use it?

### Log in - Log out
You can go to the `/login` page using the bottom bar and pressing the 👤 button.

![image](https://github.com/user-attachments/assets/2edae533-0a71-40d1-8ec9-10b62e4f18ad)

Inside, you can use one of these users:
- mail: coach1@mail.com pass: c1
- mail: coach2@mail.com pass: c2
- mail: coach3@mail.com pass: c3
- mail: student1@mail.com pass: s1
- mail: student2@mail.com pass: s2
- mail: student3@mail.com pass: s3

You can go to the `/profile` page using the bottom bar and pressing the ⚙️ button. You can log out from there.

### Coach
Being a Coach you can use the bottom bar for: 
- create new Slots --> 📝
- see all slots created --> 📅
- see all slots with calls --> 🏠

You can use the 🗑️ button on the slots to delete them.

When you have a slot with a call, you can:
- Use the 💾 button to finish the call.
- User the ✏️ button to edit the satisfaction and add notes.

### Student
Being a Student you can use the bottom bar for: 
- see all slots --> 📅
- see all your slots with calls --> 🏠

You can use the ➕ button on a free slot to create a call in it.

## Learn More

### Database diagram:

![image](https://github.com/user-attachments/assets/13a9b467-28cd-4f26-bebd-661d9368070f)

### Some examples of the tables:
#### User Data
![image](https://github.com/user-attachments/assets/f57796e4-56d3-4b22-ac33-cf115b02bd6a)

#### Slot
![image](https://github.com/user-attachments/assets/58ff3a53-f4fa-45ab-83fc-4339bb91d7da)


#### Call
![image](https://github.com/user-attachments/assets/2aefb872-3dba-43c1-b458-471e71dfb225)


#### Coach
![image](https://github.com/user-attachments/assets/6a379a12-77f2-4222-9865-7fd1a7e6c574)


