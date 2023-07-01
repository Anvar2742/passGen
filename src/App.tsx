import { customAlphabet } from "nanoid";
import { useEffect, useState } from "react";

function App() {
    const [password, setPassword] = useState("");

    const nanoid = customAlphabet(
        "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        14
    );

    const passGenerator = (): void => {
        const password: string = nanoid();

        const passRegStrong: RegExp = RegExp(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
        );
        // const passRegMedium = RegExp(
        //     / ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/
        // );

        const isValid: boolean = passRegStrong.test(password);

        if (isValid) {
            setPassword(password);
        } else {
            passGenerator();
        }
    };

    const copyPass = () => {
        navigator.clipboard.writeText(password);
    };

    useEffect(passGenerator, []);

    return (
        <main className="main">
            <div className="container">
                <h1>Generate your password!</h1>
                <div className="generator">
                    <div className="input">
                        <input type="text" value={password} readOnly />
                        <button onClick={copyPass}>Copy!</button>
                    </div>
                    <button
                        onClick={passGenerator}
                        style={{ marginTop: "20px" }}
                    >
                        Generate New
                    </button>
                </div>
            </div>
        </main>
    );
}

export default App;
