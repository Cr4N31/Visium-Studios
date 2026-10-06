import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Accent used for the selected chip state and the primary action button —
const ACCENT = "#fff";

const STEPS = [
  {
    id: "name",
    type: "text",
    question: "What is your name?",
    placeholder: "Your name",
    helper: "Press Enter ↵ to continue.",
  },
  {
    id: "email",
    type: "text",
    question: "Your email?",
    placeholder: "you@email.com",
    helper: "So we can answer you. No spam, we promise.",
  },
  {
    id: "project",
    type: "chips",
    question: "What are we building together?",
    options: [
      "Brand new",
      "Rebrand",
      "Website",
      "Ecommerce",
      "Application",
      "Video",
      "The whole package",
    ],
  },
  {
    id: "budget",
    type: "chips",
    question: "What is the budget?",
    options: ["under 2K€", "2–5K€", "5–10K€", "10–20K€", "€20K+"],
  },
  {
    id: "deadline",
    type: "chips",
    question: "When do you want to launch?",
    options: ["This month", "1–3 months", "3–6 months", "Flexible"],
  },
  {
    id: "details",
    type: "textarea",
    question: "Anything else we need to know?",
    placeholder: "Optional — links, references, constraints...",
  },
];

const SUMMARY_LABELS = {
  name: "Name",
  email: "Email",
  project: "Project",
  budget: "Budget",
  deadline: "Deadline",
  details: "Details",
};

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
};

// Same idle/hover cursor blob as the site header — white fill,
// mix-blend-difference — just scoped to this component instead of global.
const BLOB_IDLE = 10;
const BLOB_HOVER = 48;

const FormBlobCursor = memo(function FormBlobCursor({ containerRef }) {
  const blobRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const el = blobRef.current;
    if (!container || !el || reduceMotion) return;

    const s = { x: 0, y: 0, tx: 0, ty: 0, scale: 0, tScale: 0, seen: false };
    let raf = 0;

    const render = () => {
      s.x += (s.tx - s.x) * 0.22;
      s.y += (s.ty - s.y) * 0.22;
      s.scale += (s.tScale - s.scale) * 0.2;
      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) scale(${s.scale})`;

      const settled =
        Math.abs(s.tx - s.x) < 0.1 &&
        Math.abs(s.ty - s.y) < 0.1 &&
        Math.abs(s.tScale - s.scale) < 0.002;
      raf = settled ? 0 : requestAnimationFrame(render);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const isTarget = (t) => t instanceof Element && !!t.closest("[data-blob]");

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      s.tx = e.clientX - rect.left;
      s.ty = e.clientY - rect.top;
      if (!s.seen) {
        s.x = s.tx;
        s.y = s.ty;
        s.seen = true;
      }
      s.tScale = (isTarget(e.target) ? BLOB_HOVER : BLOB_IDLE) / BLOB_HOVER;
      wake();
    };

    const onLeave = () => {
      s.tScale = 0;
      wake();
    };

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [containerRef, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-20 rounded-full bg-white mix-blend-difference"
      style={{
        width: BLOB_HOVER,
        height: BLOB_HOVER,
        marginLeft: -BLOB_HOVER / 2,
        marginTop: -BLOB_HOVER / 2,
        transform: "scale(0)",
      }}
    />
  );
});

function Chip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      data-blob
      onClick={onClick}
      className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
        selected
          ? "border-transparent text-black"
          : "border-white/15 text-white/80 hover:border-white/40"
      }`}
      style={selected ? { backgroundColor: ACCENT } : undefined}
    >
      {label}
    </button>
  );
}

function StepBody({ step, value, onChange, onSubmitText }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step.id]);

  if (step.type === "text") {
    return (
      <div>
        <input
          ref={inputRef}
          type="text"
          value={value ?? ""}
          placeholder={step.placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmitText();
          }}
          className="w-full rounded-sm px-4 py-3 text-3xl font-medium outline-none md:text-4xl"
          style={{ backgroundColor: "#000" }}
        />
        {step.helper && (
          <p className="mt-2 text-sm text-black/50">{step.helper}</p>
        )}
      </div>
    );
  }

  if (step.type === "textarea") {
    return (
      <textarea
        ref={inputRef}
        value={value ?? ""}
        placeholder={step.placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none bg-transparent text-xl font-medium outline-none placeholder:text-black/30"
      />
    );
  }

  // chips
  return (
    <div className="flex flex-wrap gap-3">
      {step.options.map((option) => (
        <Chip
          key={option}
          label={option}
          selected={value === option}
          onClick={() => onChange(option)}
        />
      ))}
    </div>
  );
}

function SparkIcon() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      animate={
        reduceMotion
          ? undefined
          : { filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"] }
      }
      transition={
        reduceMotion
          ? undefined
          : { duration: 6, repeat: Infinity, ease: "linear" }
      }
      style={{ color: ACCENT }}
    >
      <path
        d="M12 2c0 4.5 1.5 8 6 10-4.5 2-6 5.5-6 10 0-4.5-1.5-8-6-10 4.5-2 6-5.5 6-10Z"
        fill="currentColor"
      />
    </motion.svg>
  );
}

function ProjectBriefForm({ onSubmit }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);

  const step = STEPS[stepIndex];
  const onSummary = stepIndex === STEPS.length;

  const canAdvance = useMemo(() => {
    if (onSummary) return true;
    const value = answers[step.id];
    if (step.type === "textarea") return true; // optional
    return typeof value === "string" && value.trim().length > 0;
  }, [answers, onSummary, step]);

  const handleChange = useCallback(
    (value) => {
      setAnswers((prev) => ({ ...prev, [step?.id]: value }));
    },
    [step],
  );

  const goNext = useCallback(() => {
    if (!canAdvance) return;
    setStepIndex((i) => Math.min(i + 1, STEPS.length));
  }, [canAdvance]);

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleSend = useCallback(() => {
    onSubmit?.(answers);
    setSubmitted(true);
  }, [answers, onSubmit]);

  const buttonLabel = submitted
    ? null
    : onSummary
      ? "Send →"
      : stepIndex === STEPS.length - 1
        ? "See the summary →"
        : "Continue →";

  return (
    <section
      ref={containerRef}
      className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center overflow-hidden px-8 py-16"
    >
      <FormBlobCursor containerRef={containerRef} />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="submitted"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-4xl font-bold md:text-6xl">Thank you.</h2>
            <p className="mt-4 text-black/60">
              We received it — expect a reply at{" "}
              <span className="font-medium text-black">{answers.email}</span>.
            </p>
          </motion.div>
        ) : onSummary ? (
          <motion.div
            key="summary"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="mt-4 text-4xl font-bold md:text-6xl">
              Sounds good.
            </h2>
            <dl className="mt-6 space-y-1.5 text-sm">
              {STEPS.map(({ id }) =>
                answers[id] ? (
                  <div key={id} className="flex gap-1.5">
                    <dt className="text-white">{SUMMARY_LABELS[id]}:</dt>
                    <dd className="font-semibold text-white/50">
                      {answers[id]}
                    </dd>
                  </div>
                ) : null,
              )}
            </dl>
          </motion.div>
        ) : (
          <motion.div
            key={step.id}
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-4xl leading-tight md:text-6xl">
              <span className="font-semibold">{step.question}</span>
            </h2>
            <div className="mt-6">
              <StepBody
                step={step}
                value={answers[step.id]}
                onChange={handleChange}
                onSubmitText={goNext}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted && (
        <div className="mt-12 flex items-center justify-between">
          <button
            type="button"
            data-blob
            onClick={goBack}
            className={`text-xs uppercase tracking-[0.15em] text-black/40 transition-opacity hover:text-black ${
              stepIndex === 0 ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            ← Back
          </button>

          <button
            type="button"
            data-blob
            disabled={!canAdvance}
            onClick={onSummary ? handleSend : goNext}
            className="rounded-full px-6 py-3 text-sm font-semibold text-black transition-opacity disabled:opacity-40"
            style={{ backgroundColor: ACCENT }}
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </section>
  );
}

export default ProjectBriefForm;
