import Navbar from "@components/navbar/navbar";
import React, {useEffect} from "react";
import Manage from "@components/manage/manage";
import Target from "@components/target/target";

const MainPage: React.FC = () => {

    return (
        <>
            <div className="main_page">
                <Navbar />
                <div className="main_page__content">
                    <div className="main_page__content--target_word">
                        <Target></Target>
                    </div>
                    <div className="main_page__content--manage">
                        <Manage></Manage>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage;