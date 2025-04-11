import { motion } from "framer-motion";

function DataLoading({className}) {
    const dotVariants = {
        jump: {
            y: -30,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className={`loading_container ${className}`}
        >
            <motion.img src="/imgs/loading.svg" className="dot" variants={dotVariants} />
            <motion.img src="/imgs/loading.svg" className="dot" variants={dotVariants} />
            <motion.img src="/imgs/loading.svg" className="dot" variants={dotVariants} />
            <StyleSheet />
        </motion.div>
    );
}

/*==============   Styles   ================*/
function StyleSheet() {
    return (
        <style>
            {`
            .loading_container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 50px;
            }

            .dot {
                width: 100%;
                height: auto;
                object-fit: cover;
                will-change: transform;
            }
            `}
        </style>
    );
}

export default DataLoading;
