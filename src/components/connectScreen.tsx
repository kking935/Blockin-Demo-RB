import { connect } from "../wallet/connect"
import { useWalletContext } from "../contexts/WalletContext"
import { useEffect, useState } from "react"

const ConnectScreen = () => {

    const { connector, setConnector } = useWalletContext();

    const handleConnect = () => {
        const connector = connect()
        setConnector(connector)
    }

    useEffect(() => {
        handleConnect();
    }, []);

    return (
        <section className={`${!connector || connector.connected ? 'hidden' : 'connect-screen'}`}>
            <div>
                <h1>You must connect your wallet to get started</h1>
                <button onClick={handleConnect}>Connect Wallet</button>
            </div>
        </section>
    )
}

export default ConnectScreen