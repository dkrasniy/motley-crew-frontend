import Layout from "../components/Layout";

function TeleworkAgreement() {

    return (
        <Layout>
            <div className="container mx-auto px-4 md:px-6 py-10">
             <div className="flex justify-between">
                <b className="text-xl md:text-2xl text-gray-800">Telework Agreement</b> 
             </div>

             <div className="bg-gray-50 rounded-xl p-8 my-6 max-w-3xl">
                    <p htmlFor="description" className="mb-1 text-left block text-sm font-medium text-gray-800">
                        Your template is blank
                    </p>
            </div>

            </div>
        </Layout>
    );
}

export default TeleworkAgreement;