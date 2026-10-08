import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SteelLine from "./SteelLine";
import { products } from "@/data/products";

// ─────────────────────────────────────────────────────────────
// Frontend demo only.
// Connect this form to the company's enquiry service later
// (e.g. POST /api/enquiry, WhatsApp deep-link, or email service).
// ─────────────────────────────────────────────────────────────
const productOptions = [...products.map((p) => p.name), "General Enquiry"];

const initial = {
    name: "",
    company: "",
    phone: "",
    email: "",
    product: "General Enquiry",
    message: "",
};

export default function EnquiryForm() {
    const [params] = useSearchParams();
    const fromProduct = products.find((p) => p.slug === params.get("product"))?.name;
    const [values, setValues] = useState({ ...initial, product: fromProduct || initial.product });
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);
    const [sentName, setSentName] = useState("");

    const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

    const validate = () => {
        const errs = {};
        if (!values.name.trim()) errs.name = "Required";
        if (!/^[+\d][\d\s-]{7,}$/.test(values.phone.trim())) errs.phone = "Enter a valid phone number";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errs.email = "Enter a valid email";
        return errs;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length) return;
        // Demo submission — nothing leaves the browser.
        setSentName(values.name.split(" ")[0]);
        setSent(true);
    };

    if (sent)
        return (
            <div className="flex h-full flex-col items-start justify-center py-16" data-testid="enquiry-success">
                <SteelLine bronze className="w-20" />
                <h3 className="mt-8 font-display text-4xl font-bold tracking-[-0.01em] text-graphite">
                    Enquiry noted<span className="text-bronze">.</span>
                </h3>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-graphite/70">
                    Thank you, {sentName}. Our team will get back to you shortly to discuss your requirement.
                </p>
                <p className="micro-label mt-8 text-graphite/45">DEMO SUBMISSION &mdash; NO DATA WAS SENT</p>
                <button
                    type="button"
                    onClick={() => {
                        setValues(initial);
                        setSent(false);
                    }}
                    data-testid="enquiry-send-another"
                    className="mt-8 border-b border-bronze pb-1 font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-graphite transition-colors hover:text-bronze"
                >
                    Send another enquiry
                </button>
            </div>
        );

    return (
        <form onSubmit={onSubmit} noValidate data-testid="enquiry-form">
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                <div>
                    <label htmlFor="f-name" className="field-label">Name *</label>
                    <input id="f-name" type="text" value={values.name} onChange={set("name")} placeholder="Your name" className={`field-input ${errors.name ? "has-error" : ""}`} data-testid="enquiry-field-name" aria-invalid={!!errors.name} />
                    {errors.name && <span className="field-error-text" data-testid="enquiry-error-name">{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="f-company" className="field-label">Company</label>
                    <input id="f-company" type="text" value={values.company} onChange={set("company")} placeholder="Firm / organisation" className="field-input" data-testid="enquiry-field-company" />
                </div>
                <div>
                    <label htmlFor="f-phone" className="field-label">Phone *</label>
                    <input id="f-phone" type="tel" value={values.phone} onChange={set("phone")} placeholder="+91" className={`field-input ${errors.phone ? "has-error" : ""}`} data-testid="enquiry-field-phone" aria-invalid={!!errors.phone} />
                    {errors.phone && <span className="field-error-text" data-testid="enquiry-error-phone">{errors.phone}</span>}
                </div>
                <div>
                    <label htmlFor="f-email" className="field-label">Email *</label>
                    <input id="f-email" type="email" value={values.email} onChange={set("email")} placeholder="name@firm.in" className={`field-input ${errors.email ? "has-error" : ""}`} data-testid="enquiry-field-email" aria-invalid={!!errors.email} />
                    {errors.email && <span className="field-error-text" data-testid="enquiry-error-email">{errors.email}</span>}
                </div>
                <div className="relative sm:col-span-2">
                    <label htmlFor="f-product" className="field-label">Product</label>
                    <select id="f-product" value={values.product} onChange={set("product")} className="field-input pr-8" data-testid="enquiry-field-product">
                        {productOptions.map((o) => (
                            <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                    <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-1 text-bronze">&#9662;</span>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="f-message" className="field-label">Requirement / Message</label>
                    <textarea id="f-message" rows={3} value={values.message} onChange={set("message")} placeholder="Sizes, quantities, application — whatever helps us respond faster." className="field-input resize-none" data-testid="enquiry-field-message" />
                </div>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
                <button
                    type="submit"
                    data-testid="enquiry-submit"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-[3px] border border-graphite/40 px-9 py-4 text-graphite transition-colors duration-300 hover:border-bronze"
                >
                    <span aria-hidden="true" className="absolute inset-0 translate-y-full bg-bronze transition-transform duration-[350ms] ease-kchr group-hover:translate-y-0" />
                    <span className="relative z-10 font-display text-[13px] font-semibold uppercase tracking-[0.16em] transition-transform duration-300 group-hover:translate-x-[3px]">Send Enquiry</span>
                    <span aria-hidden="true" className="relative z-10 text-bronze transition-all duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[2px] group-hover:text-precision">&#8599;</span>
                </button>
                <p className="micro-label text-graphite/40">RESPONSE DURING WORKING HOURS</p>
            </div>
        </form>
    );
}
