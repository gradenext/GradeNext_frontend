import { Calculator, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import Modal from "../Modal";

const CalculatorComponent = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [display, setDisplay] = useState("0");
	const [firstNumber, setFirstNumber] = useState("");
	const [operation, setOperation] = useState("");
	const [newNumber, setNewNumber] = useState(true);
	const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

	const stateRef = useRef({
		display,
		firstNumber,
		operation,
		newNumber,
		waitingForSecondNumber,
	});

	useEffect(() => {
		stateRef.current = {
			display,
			firstNumber,
			operation,
			newNumber,
			waitingForSecondNumber,
		};
	}, [display, firstNumber, operation, newNumber, waitingForSecondNumber]);

	const computeResult = (num1, num2, op) => {
		switch (op) {
			case "+":
				return num1 + num2;
			case "-":
				return num1 - num2;
			case "×":
				return num1 * num2;
			case "÷":
				return num2 === 0 ? NaN : num1 / num2;
			default:
				return num2; // Return the second number if no operation
		}
	};

	const formatNumber = (num) => {
		if (isNaN(num)) return "Error";
		const stringNum = num.toString();
		if (stringNum.includes("e"))
			return parseFloat(num.toPrecision(10)).toString();
		if (stringNum.length > 10) {
			// Handle integers that are too long
			if (!stringNum.includes(".")) {
				return "Error";
			}
			// Handle decimal numbers that are too long
			return stringNum.slice(0, 11);
		}
		return stringNum;
	};

	const handleNumber = (num) => {
		if (display === "Error") {
			setDisplay(num);
			setNewNumber(false);
			setWaitingForSecondNumber(false);
			return;
		}

		if (newNumber || display === "0") {
			setDisplay(num);
			setNewNumber(false);
		} else {
			if (display.replace(".", "").length >= 10) return;
			setDisplay(display + num);
		}

		if (waitingForSecondNumber) {
			setWaitingForSecondNumber(false);
		}
	};

	const handleDecimal = () => {
		if (newNumber) {
			setDisplay("0.");
			setNewNumber(false);
			return;
		}
		if (!display.includes(".")) {
			setDisplay(display + ".");
		}
	};

	const handleOperation = (op) => {
		if (op === "C") {
			resetCalculator();
			return;
		}

		if (op === "=") {
			if (!operation || firstNumber === "") return;

			const num1 = parseFloat(firstNumber);
			const num2 = parseFloat(display);
			const result = computeResult(num1, num2, operation);

			if (isNaN(result)) {
				setDisplay("Error");
				resetCalculator();
				return;
			}

			setDisplay(formatNumber(result));
			resetCalculator(false, formatNumber(result));
			return;
		}

		// If we have a previous operation pending, compute it first
		if (firstNumber !== "" && operation && !waitingForSecondNumber) {
			const num1 = parseFloat(firstNumber);
			const num2 = parseFloat(display);
			const result = computeResult(num1, num2, operation);

			if (isNaN(result)) {
				setDisplay("Error");
				resetCalculator();
				return;
			}

			const formattedResult = formatNumber(result);
			setDisplay(formattedResult);
			setFirstNumber(formattedResult);
		} else {
			setFirstNumber(display);
		}

		setOperation(op);
		setNewNumber(true);
		setWaitingForSecondNumber(true);
	};

	const resetCalculator = (fullReset = true, initialDisplay = "0") => {
		if (fullReset) {
			setFirstNumber("");
			setOperation("");
		}
		setDisplay(initialDisplay);
		setNewNumber(true);
		setWaitingForSecondNumber(false);
	};

	const handleBackspace = () => {
		if (display === "Error") {
			resetCalculator();
			return;
		}

		if (
			display.length === 1 ||
			(display.length === 2 && display.startsWith("-"))
		) {
			setDisplay("0");
			setNewNumber(true);
		} else {
			setDisplay(display.slice(0, -1));
		}
	};

	const calculatorButtons = [
		["C", "÷", "×", "⌫"],
		["7", "8", "9", "-"],
		["4", "5", "6", "+"],
		["1", "2", "3"],
		["0", ".", "="],
	];

	useEffect(() => {
		const handleKeyDown = (e) => {
			const key = e.key;

			if (
				[
					"0",
					"1",
					"2",
					"3",
					"4",
					"5",
					"6",
					"7",
					"8",
					"9",
					".",
					"+",
					"-",
					"*",
					"/",
					"Enter",
					"=",
					"Backspace",
					"Escape",
					"Delete",
				].includes(key)
			) {
				e.preventDefault();
			}

			if (key >= "0" && key <= "9") {
				handleNumber(key);
			} else if (key === ".") {
				handleDecimal();
			} else if (key === "Enter" || key === "=") {
				handleOperation("=");
			} else if (key === "Backspace" || key === "Delete") {
				handleBackspace();
			} else if (key === "Escape") {
				handleOperation("C");
			} else if (["+", "-", "*", "/"].includes(key)) {
				const op = key === "*" ? "×" : key === "/" ? "÷" : key;
				handleOperation(op);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<>
			<button
				className="bg-blue-500 text-sm border border-blue-500 rounded-full p-3 shadow-lg cursor-pointer"
				onClick={() => setIsOpen(true)}
			>
				<Calculator className="h-4 w-4 text-white" />
			</button>

			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title={"Calculator"}
			>
				<div className="w-full">
					<div className="mb-4">
						<div className="bg-gray-100 p-4 rounded-lg flex flex-col gap-y-4">
							<div className="text-gray-500 text-xl h-6 text-right">
								{firstNumber && `${firstNumber} ${operation}`}
							</div>
							<div
								className={`text-right transition-all ${
									display === "Error"
										? "text-red-500 text-2xl"
										: "text-3xl"
								}`}
								style={{
									fontSize:
										display.length > 10
											? `${Math.max(
													1.5 -
														(display.length - 10) *
															0.15,
													0.8
											  )}rem`
											: undefined,
								}}
							>
								{display}
							</div>
						</div>
					</div>
					<div className="grid grid-cols-4 gap-2">
						{calculatorButtons.map((row, rowIndex) =>
							row.map((btn, btnIndex) => (
								<button
									key={btn}
									onClick={() => {
										if (btn === ".") {
											handleDecimal();
										} else if (btn === "⌫") {
											handleBackspace();
										} else if (
											[
												"C",
												"=",
												"+",
												"-",
												"×",
												"÷",
											].includes(btn)
										) {
											handleOperation(btn);
										} else {
											handleNumber(btn);
										}
									}}
									className={`h-14 text-lg rounded-lg border cursor-pointer ${
										btn === "="
											? "bg-blue-800 hover:bg-blue-700 text-white row-span-2"
											: ["+", "-", "×", "÷"].includes(btn)
											? "bg-blue-800 hover:bg-blue-700 text-white"
											: btn === "C" || btn === "⌫"
											? "bg-red-500 hover:bg-red-400 text-white"
											: "bg-white hover:bg-gray-200 border-gray-300"
									} ${
										rowIndex === 3 && btnIndex === 2
											? "col-span-2"
											: rowIndex === 4 && btn === "0"
											? "col-span-2"
											: ""
									} transition-colors`}
								>
									{btn}
								</button>
							))
						)}
					</div>
				</div>
			</Modal>
		</>
	);
};

export default CalculatorComponent;
