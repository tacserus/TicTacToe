import React from "react";
import { Link } from "react-router";
import AppRouter from "../../routing/app-router.ts";

export default function UndefinedPage() {
    return (
        <div className="undefined_page_container">
            <div className="undefined_page_message">
                Error 404: Page Not Found
            </div>
            <div className="undefined_page_message_advice">
                <div>Go to</div>
                <div>
                    <Link to={AppRouter.Main}>Tic-Tac-Toe</Link>
                </div>
            </div>
        </div>
    );
}
