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
				return NaN;
		}
	};

	const formatNumber = (num) => {
		const stringNum = num.toString();
		if (stringNum.includes("e")) return "Error";
		if (stringNum.length > 10) return stringNum.slice(0, 10);
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
			setDisplay("0");
			setFirstNumber("");
			setOperation("");
			setNewNumber(true);
			setWaitingForSecondNumber(false);
			return;
		}

		if (op === "=") {
			if (!operation || !firstNumber) return;

			const num1 = parseFloat(firstNumber);
			const num2 = parseFloat(display);
			const result = computeResult(num1, num2, operation);

			if (!isFinite(result)) {
				setDisplay("Error");
				setFirstNumber("");
				setOperation("");
				setNewNumber(true);
				setWaitingForSecondNumber(false);
				return;
			}

			setDisplay(formatNumber(result));
			setFirstNumber("");
			setOperation("");
			setNewNumber(true);
			setWaitingForSecondNumber(false);
			return;
		}

		if (firstNumber && operation && !newNumber) {
			const num1 = parseFloat(firstNumber);
			const num2 = parseFloat(display);
			const result = computeResult(num1, num2, operation);

			if (!isFinite(result)) {
				setDisplay("Error");
				setFirstNumber("");
				setOperation("");
				setNewNumber(true);
				setWaitingForSecondNumber(false);
				return;
			}

			setDisplay(formatNumber(result));
			setFirstNumber(formatNumber(result));
		} else {
			setFirstNumber(display);
		}

		setOperation(op);
		setNewNumber(true);
		setWaitingForSecondNumber(true);
	};

	const calculatorButtons = [
		["7", "8", "9", "+"],
		["4", "5", "6", "×"],
		["1", "2", "3", "-"],
		["0", ".", "C", "÷"],
		["="],
	];

	useEffect(() => {
		const handleKeyDown = (e) => {
			const key = e.key;
			const currentState = stateRef.current;

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
					"Backspace",
				].includes(key)
			) {
				e.preventDefault();
			}

			if (key >= "0" && key <= "9") {
				handleNumber(key);
			} else if (key === ".") {
				handleDecimal();
			} else if (key === "Enter") {
				handleOperation("=");
			} else if (key === "Backspace") {
				if (display === "Error") {
					handleOperation("C");
				} else {
					setDisplay((prev) =>
						prev.length > 1 ? prev.slice(0, -1) : "0"
					);
				}
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

	const modalRef = useRef(null);

	// Click outside handler
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<button
				className=" bg-blue-500 text-sm border border-blue-500 rounded-full p-3  shadow-lg cursor-pointer"
				onClick={() => setIsOpen(true)}
			>
				<Calculator className="h-4 w-4 text-white" />
			</button>

			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title={"Calculator"}
			>
				<div className="mb-4">
					<div className="bg-gray-100 p-4 rounded-lg flex flex-col gap-y-4">
						<div className="text-gray-500 text-3xl h-6 text-right">
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
						row.map((btn) => (
							<button
								key={btn}
								onClick={() => {
									if (btn === ".") handleDecimal();
									else if (
										["C", "=", "+", "-", "×", "÷"].includes(
											btn
										)
									)
										handleOperation(btn);
									else handleNumber(btn);
								}}
								className={`h-14 text-lg rounded-lg border cursor-pointer ${
									btn === "="
										? "bg-blue-800 hover:bg-blue-700 text-white col-span-4"
										: ["+", "-", "×", "÷"].includes(btn)
										? " bg-blue-800 hover:bg-blue-700 text-white"
										: "bg-white hover:bg-gray-200 border-gray-300"
								} transition-colors`}
							>
								{btn}
							</button>
						))
					)}
				</div>
			</Modal>
		</>
	);
};

export default CalculatorComponent;
