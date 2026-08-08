import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";
import { legal } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PAPAGEDON Labs handles personal data collected through this site — no cookies, no analytics, no tracking.",
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro="This site collects no personal data on its own. No cookies, no analytics, no tracking pixels. The only information we ever receive is what you deliberately send us."
    >
      <h2>1. Who we are</h2>
      <p>
        This site is operated by <strong>{legal.entity}</strong>
        {legal.registration ? ` (${legal.registration})` : ""}, founded and run by{" "}
        {legal.operator}, based in Enugu, Nigeria. For the purposes of the Nigeria Data
        Protection Act 2023 (NDPA), we are the data controller for any personal data
        described below. You can reach us at{" "}
        <a href={`mailto:${legal.email}`}>{legal.email}</a>.
      </p>

      <h2>2. What this site collects automatically</h2>
      <p>
        Nothing. This site sets no cookies, runs no analytics, and embeds no tracking
        pixels or advertising scripts. Typefaces are compiled into the site at build
        time rather than loaded from a third party, so simply reading these pages sends
        no request to any outside company.
      </p>
      <p>
        Our hosting provider may keep short-lived server logs — typically IP address,
        browser type and requested page — as an ordinary part of serving and securing
        the site. We do not use those logs to build a profile of you, and we do not
        combine them with anything else.
      </p>

      <h2>3. Information you choose to give us</h2>
      <ul>
        <li>
          <strong>The PAPAGEDON waitlist.</strong> The waitlist form is hosted on Google
          Forms. Whatever you enter — typically your name and email address — is stored
          in Google&apos;s systems and shared with us. Google processes that data under
          its own privacy policy, and your submission is also governed by it.
        </li>
        <li>
          <strong>Email, phone and messaging.</strong> If you write to us by email, call
          or text the listed number, or message us through WhatsApp or Telegram, we
          receive the contents of your message and the account details attached to it.
          WhatsApp and Telegram are independent services with their own privacy terms.
        </li>
      </ul>

      <h2>4. Why we hold it, and on what basis</h2>
      <p>
        We use what you send us for one purpose: to reply to you, and — if you joined the
        waitlist — to tell you when PAPAGEDON opens. Under the NDPA our lawful basis is
        your consent, which you give by submitting the form or by contacting us, and our
        legitimate interest in responding to enquiries about our work.
      </p>
      <p>
        We do not sell personal data. We do not share it with advertisers, data brokers,
        or anyone else, other than the service providers named above who process it on
        our behalf so the form and the messages can work at all.
      </p>

      <h2>5. How long we keep it</h2>
      <p>
        Waitlist entries are kept until PAPAGEDON launches and the announcement has gone
        out, or until you ask us to remove you — whichever comes first. Correspondence is
        kept for as long as it is useful to the conversation, and deleted when it is not.
      </p>

      <h2>6. Your rights</h2>
      <p>
        Under the NDPA you have the right to ask us for a copy of the personal data we
        hold about you, to have it corrected if it is wrong, to have it deleted, to
        withdraw consent at any time, and to object to how we are using it. Email{" "}
        <a href={`mailto:${legal.email}`}>{legal.email}</a> and we will act on your
        request without charge.
      </p>
      <p>
        If you believe we have mishandled your data, you may lodge a complaint with the
        Nigeria Data Protection Commission (NDPC).
      </p>

      <h2>7. Links to other sites</h2>
      <p>
        This site links out to GitHub, LinkedIn, X, Instagram, TikTok, YouTube, Telegram,
        WhatsApp, Behance, Audiomack, OpenSea and Google Forms. Once you follow one of
        those links you are on someone else&apos;s service, under their privacy policy and
        their terms. We are not responsible for what they collect or how they use it.
      </p>

      <h2>8. Children</h2>
      <p>
        This site is not directed at children, and we do not knowingly collect personal
        data from anyone under 18. If you believe a child has sent us personal data, tell
        us and we will delete it.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        If this policy changes — for instance if we add analytics or a newsletter — we
        will update this page and change the date at the top. Continuing to use the site
        after a change means you accept the revised policy.
      </p>
    </LegalShell>
  );
}
