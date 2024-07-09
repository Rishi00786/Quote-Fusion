import initialProfile from "@/lib/initial-profile";
import Navbar from '@/components/Body/Navbar'
import MainBody from '@/components/Body/generate-quote-body'

const setupPage = async () => {

  const profile = await initialProfile()

  if(!profile){
    throw new Error ("Profile not found");
  }

  console.log(profile) 

  return (
    <div>
      <Navbar profile={profile}/>
      <MainBody/>
    </div>
  )
}

export default setupPage