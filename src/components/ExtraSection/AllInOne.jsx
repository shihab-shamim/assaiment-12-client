
import gallary1 from '../../assets/gallary/gallary1.jpg'
import gallary2 from '../../assets/gallary/gallary2.jpg'
import gallary3 from '../../assets/gallary/gallary3.jpg'
import gallary4 from '../../assets/gallary/gallary4.jpg'
import gallary5 from '../../assets/gallary/gallary5.jpg'
import gallary6 from '../../assets/gallary/gallary6.jpg'
import gallary7 from '../../assets/gallary/gallary7.jpg'
import gallary8 from '../../assets/gallary/gallary8.jpg'
import gallary9 from '../../assets/gallary/gallary9.jpg'
import gallary10 from '../../assets/gallary/gallary10.jpg'
const AllInOne = () => {
    return (
        <section className="py-6 dark:bg-gray-100 dark:text-gray-900">
	<div className="container grid grid-cols-2 gap-4 p-4 mx-auto md:grid-cols-4">
		<img src={gallary10} alt="" className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square" />
		<img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={gallary1} />
		<img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={gallary2} />
		<img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={gallary3} />
		<img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={gallary4} />
		<img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={gallary5} />
		<img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={gallary6} />
		<img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={gallary7} />
		<img alt="" className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square" src={gallary8} />
		<img src={gallary9} alt="" className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 aspect-square" />
	</div>
</section>
    );
};

export default AllInOne;