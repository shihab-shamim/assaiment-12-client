
const axiosPublic=axios.create({
    baseURL: 'https://bistro-boss-server-nu-seven.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;