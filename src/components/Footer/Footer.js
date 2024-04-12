import './Footer.scss';

function Footer() {
    return (
        <footer className='footer'>
            <h3>@ 2024 StreamFinder by Jake Craig</h3>
            <section className='footer__details'>
                <a className='footer__details-link' href='www.linkedin.com/in/jake-craig-5367812a9'>
                    <h3>LinkedIn Profile</h3>
                </a>
                <a className='footer__details-link'  href='https://github.com/Jtcraig513'>
                    <h3>Github Profile</h3>
                </a>
            </section>
        </footer>
    );
}

export default Footer;