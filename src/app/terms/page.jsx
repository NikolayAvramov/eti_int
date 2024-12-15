import "./terms.scss";

export default function Terms() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const date = new Date();
    let currentDate = `${date.getDate()}:${daysOfWeek[date.getDay()]}:${monthsOfYear[date.getMonth()]}:${date.getFullYear()}`;

    return (
        <section className="terms">
            <div className="terms-container">
                <h2 className="terms-title">Terms and Conditions</h2>
                <h4 className="terms-effective-date"> Effective Date: {currentDate}</h4>
                <p className="terms-text">
                    Welcome to Something Broadband! These Terms and Conditions govern your access to and use of our website and
                    services provided by Something Broadband , including internet and TV subscriptions . By accessing or using our
                    website and purchasing any Services, you agree to comply with these Terms. Please read them carefully.
                </p>
                <ul className="terms-list">
                    <li className="terms-list-item">
                        1. Acceptance of Terms By accessing or using the Services on this website, you agree to be bound by these
                        Terms, including any updates or amendments. If you do not agree with these Terms, you must not use our
                        website or Services.
                    </li>
                    <li className="terms-list-item">
                        2. Services Something Broadband offers internet and TV subscription plans as outlined on our website. All
                        descriptions, pricing, and available features are subject to change at any time without prior notice.
                        Internet Subscriptions: Various internet plans for home or business use with different speed options and
                        pricing. TV Subscriptions: Plans for access to television content via cable, satellite, or streaming
                        service. Bundle Offers: Combined internet and TV subscription packages at discounted rates.
                    </li>
                    <li className="terms-list-item">
                        3. Account Registration To purchase Services, you may be required to create an account. You agree to
                        provide accurate, current, and complete information during the registration process and to update your
                        information if it changes. You are responsible for maintaining the confidentiality of your account and
                        password.
                    </li>
                    <li className="terms-list-item">
                        4. Subscription Fees and Payment Pricing: Subscription fees are as listed on the website at the time of
                        purchase. Prices may vary based on location, plan, and promotional offers. Billing: Payment for the
                        Services will be charged to your selected payment method. All payments are processed via a secure
                        third-party payment gateway. Taxes: You may be responsible for applicable taxes or charges, which will be
                        added to the subscription fee where required by law. Refund Policy: Refunds may be issued for overcharges
                        or billing errors, but not for cancellation of service during an active subscription term.
                    </li>
                    <li className="terms-list-item">
                        5. Termination and Cancellations Termination by You: You may cancel your subscription at any time through
                        your account dashboard or by contacting customer support. Termination by Us: We reserve the right to
                        suspend or terminate your access to the Services without notice if we suspect fraudulent activity, a
                        violation of these Terms, or non-payment. Refunds Upon Termination: Depending on the plan and
                        circumstances, partial refunds may or may not be offered upon cancellation.
                    </li>
                    <li className="terms-list-item">
                        {" "}
                        6. Usage Rights and Restrictions License: Upon purchasing a subscription, you are granted a non-exclusive,
                        non-transferable license to access and use the Services for personal use only. You may not sublicense,
                        distribute, or otherwise exploit the content or Services. Prohibited Activities: You agree not to: Use the
                        Services for any unlawful or unauthorized purpose. Interfere with or disrupt the website, servers, or
                        networks connected to the Services. Attempt to gain unauthorized access to any part of the website or
                        Services.{" "}
                    </li>
                    <li className="terms-list-item">
                        7. Service Availability and Limitations Service Availability: While we strive to provide continuous and
                        uninterrupted service, we do not guarantee that the Services will always be available, error-free, or free
                        of interruptions. Technical Issues: In the event of technical issues or planned maintenance, we will make
                        reasonable efforts to notify customers in advance but will not be liable for any loss of service.
                    </li>
                    <li className="terms-list-item">
                        8. Privacy and Data Protection We respect your privacy and handle your personal data in accordance with
                        our [Privacy Policy] (link to your privacy policy). By using the website and subscribing to our services,
                        you consent to the collection and use of your personal information as described.
                    </li>
                    <li className="terms-list-item">
                        9. Limitation of Liability To the fullest extent permitted by law, Something Broadband is not liable for
                        any direct, indirect, incidental, special, or consequential damages arising from the use or inability to
                        use our Services, including any loss of data or interruption of service.{" "}
                    </li>
                    <li className="terms-list-item">
                        10. Indemnification You agree to indemnify, defend, and hold harmless Something Broadband and its
                        affiliates, officers, directors, and employees from any claims, liabilities, damages, or expenses arising
                        from your use of the website and Services, including any violation of these Terms.{" "}
                    </li>
                    <li className="terms-list-item">
                        {" "}
                        11. Changes to Terms We reserve the right to update or modify these Terms at any time. Any changes will be
                        posted on this page with an updated "Effective Date." Your continued use of the Services after any changes
                        constitutes acceptance of the new Terms.
                    </li>
                    <li className="terms-list-item">
                        12. Governing Law These Terms are governed by and construed in accordance with the laws of [Your
                        Jurisdiction]. Any disputes related to these Terms shall be resolved exclusively in the courts located in
                        [Your Jurisdiction].
                    </li>
                    <li className="terms-list-item">
                        13. Contact Us If you have any questions about these Terms, please contact us at: Something Broadband :
                        support@somethingbroadband.com or 555 404 983 2444
                    </li>
                </ul>
            </div>
        </section>
    );
}
