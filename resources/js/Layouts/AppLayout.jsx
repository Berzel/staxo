import Footer from "@/Components/Footer";
import TopNav from "@/Components/TopNav";

export default function AppLayout({children}) {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="container">
                    <TopNav />
                </div>

                { children }

                <Footer />
            </div>
        </>
    )
}
