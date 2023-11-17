
import HomeFashion from "./home/fashion/page";

export const metadata = {
	title: 'Frida Aksesuar',
  description: 'Internet magaza',
}

const HomeOne = () => {
  return ( 
    <>	
	<main className="main-wrapper pv-main-wrapper">
		<HomeFashion/>
	</main>	
    </>
   );
}
 
export default HomeOne;
