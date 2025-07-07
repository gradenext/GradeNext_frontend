// src/constants/formulas.js

export const GRADE_TOPICS = {
    3: [
        { key: "introducing_multiplication", name: "Introducing Multiplication" },
        { key: "area_and_multiplication", name: "Area and Multiplication" },
        { key: "relating_multiplication_to_division", name: "Relating Multiplication to Division" },
        { key: "fractions_as_numbers", name: "Fractions as Numbers" }
    ],
    4: [
        { key: "factors_and_multiples", name: "Factors and Multiples" },
        { key: "fraction_equivalence_comparison", name: "Fraction Equivalence and Comparison" },
        { key: "extending_operations_fractions", name: "Extending Operations with Fractions" },
        { key: "hundredths_to_hundred_thousands", name: "Decimals and Place Value" },
        { key: "multiplicative_comparison_measurement", name: "Multiplicative Comparison and Measurement" },
        { key: "multiplying_dividing_multi_digit", name: "Multi-Digit Multiplication and Division" },
        { key: "angles_angle_measurement", name: "Angles and Angle Measurement" },
        { key: "properties_two_dimensional_shapes", name: "2D Shapes and Their Properties" }
    ],
    5: [
        { key: "finding_volume", name: "Finding Volume" },
        { key: "fractions_as_quotients_multiplication", name: "Fractions as Quotients and Multiplication" },
        { key: "multiplying_dividing_fractions", name: "Multiplying and Dividing Fractions" },
        { key: "wrapping_up_multiplication_division", name: "Wrapping Up Multiplication and Division" },
        { key: "place_value_decimal_operations", name: "Place Value and Decimal Operations" },
        { key: "more_decimal_fraction_operations", name: "More Decimal and Fraction Operations" },
        { key: "shapes_coordinate_grid", name: "Shapes and Coordinate Grid" }
    ],
    6: [
        { key: "reasoning_to_find_area", name: "Reasoning to Find Area" },
        { key: "introducing_ratios", name: "Introducing Ratios" },
        { key: "unit_rates_and_percentages", name: "Unit Rates and Percentages" },
        { key: "dividing_fractions", name: "Dividing Fractions" },
        { key: "arithmetic_in_base_ten", name: "Arithmetic in Base Ten" },
        { key: "expressions_and_equations", name: "Expressions and Equations" },
        { key: "rational_numbers", name: "Rational Numbers" },
        { key: "data_sets_and_distributions", name: "Data Sets and Distributions" },
    ],
    7: [
        { key: "scale_drawings", name: "Scale Drawings" },
        { key: "introducing_proportional_relationships", name: "Introducing Proportional Relationships" },
        { key: "measuring_circles", name: "Measuring Circles" },
        { key: "proportional_relationships_and_percentages", name: "Proportional Relationships and Percentages" },
        { key: "rational_number_arithmetic", name: "Rational Number Arithmetic" },
        { key: "expressions_equations_and_inequalities", name: "Expressions, Equations, and Inequalities" },
        { key: "angles_triangles_and_prisms", name: "Angles, Triangles, and Prisms" },
        { key: "probability_and_sampling", name: "Probability and Sampling" },
    ],
    8: [
        { key: "rigid_transformations_and_congruence", name: "Rigid Transformations and Congruence" },
        { key: "dilations_similarity_and_introducing_slope", name: "Dilations, Similarity, and Introducing Slope" },
        { key: "linear_relationships", name: "Linear Relationships" },
        { key: "linear_equations_and_linear_systems", name: "Linear Equations and Linear Systems" },
        { key: "functions_and_volume", name: "Functions and Volume" },
        { key: "associations_in_data", name: "Associations in Data" },
        { key: "exponents_and_scientific_notation", name: "Exponents and Scientific Notation" },
        { key: "pythagorean_theorem_and_irrational_numbers", name: "Pythagorean Theorem and Irrational Numbers" }
    ],



};

export const TOPIC_FORMULAS = {
    introducing_multiplication: [
        "a × b = b × a (Commutative Property)",
        "(a × b) × c = a × (b × c) (Associative Property)",
        "a × 1 = a (Multiplicative Identity)",
        "a × 0 = 0 (Zero Property)"
    ],
    area_and_multiplication: [
        "Area = length × width",
        "Area of rectangle = l × w",
        "Area of composite figure = sum of individual rectangle areas"
    ],
    relating_multiplication_to_division: [
        "a ÷ b = c ⇔ a = b × c",
        "Division is the inverse of multiplication"
    ],
    fractions_as_numbers: [
        "Fraction = part / whole",
        "Equivalent fractions: a/b = (a×n)/(b×n)",
        "a/b + c/b = (a + c)/b (same denominator)"
    ],

    // Grade 4 topics
    factors_and_multiples: [
        "Factor: A number that divides another number without a remainder",
        "Multiple: The result of multiplying a number by an integer",
        "Common Factors: Factors shared by two or more numbers",
        "Greatest Common Factor (GCF): The largest number that divides two or more numbers",
        "Least Common Multiple (LCM): The smallest multiple that two or more numbers share"
    ],

    fraction_equivalence_comparison: [
        "Equivalent fractions: a/b = (a×n)/(b×n)",
        "Cross-multiplication to compare: a/b > c/d ⇔ a×d > b×c",
        "To compare fractions: Convert to same denominator and compare numerators",
    ],

    extending_operations_fractions: [
        "Addition with same denominators: a/b + c/b = (a + c)/b",
        "Subtraction with same denominators: a/b - c/b = (a - c)/b",
        "Addition/Subtraction with unlike denominators: Convert to common denominator using LCM",
        "Mixed decimals: Tenths + Hundredths = Convert to hundredths first",
        "Multiplying fraction by whole number: a/b × w = (a × w)/b"
    ],

    hundredths_to_hundred_thousands: [
        "Place values: Tenths = 1/10, Hundredths = 1/100, Thousandths = 1/1000",
        "Decimal Place Value Chart: 1, 0.1, 0.01, 0.001, ...",
        "Comparing decimals: Line up decimal points and compare digits from left to right",
        "Rounding: Look at the digit to the right of the rounding place",
    ],

    multiplicative_comparison_measurement: [
        "Multiplicative comparison: If a is n times as much as b → a = n × b",
        "Converting centimeters and meters: 1 meter = 100 centimeters",
        "Converting grams and kilograms: 1 kilogram = 1000 grams",
        "Converting minutes and seconds: 1 minute = 60 seconds",
    ],

    multiplying_dividing_multi_digit: [
        "Long multiplication: Multiply each digit and add partial products",
        "Long division: Divide → Multiply → Subtract → Bring down next digit",
        "Estimation: Round numbers to nearest 10 or 100 before calculating",
        "Check work: Multiply quotient × divisor + remainder = dividend",
    ],

    angles_angle_measurement: [
        "Acute angle: < 90°",
        "Right angle: = 90°",
        "Obtuse angle: > 90° and < 180°",
        "Straight angle: = 180°, Full angle: = 360°",
        "Angle addition: ∠A + ∠B = ∠C if angles share a vertex and are adjacent"
    ],

    properties_two_dimensional_shapes: [
        "Triangle angle sum = 180°",
        "Rectangle: Opposite sides equal, all angles 90°",
        "Square: All sides equal, all angles 90° (a special rectangle)",
        "Symmetry: A shape has symmetry if it can be folded into two equal parts",
        "Parallel lines: Lines in a plane that never intersect"
    ],

    // Grade 5 topics
    finding_volume: [
        "Volume = length × width × height",
        "Volume of right rectangular prism = l × w × h",
        "Volume of cube = s³ where s = side length",
        "Volume of cylinder = π × r² × h",
        "Volume of cone = (1/3) × π × r² × h",
        "Volume of composite figure = sum of volumes of individual parts"
    ],

    fractions_as_quotients_multiplication: [
        "Fraction as quotient: a ÷ b = a/b",
        "Multiplying a fraction by a whole number: a/b × c = (a × c)/b",
        "Area of square with side a/b = (a/b)²",
        "Quotient of two numbers can be expressed as a fraction"
    ],

    multiplying_dividing_fractions: [
        "Multiplying fractions: a/b × c/d = (a × c)/(b × d)",
        "Dividing fractions: a/b ÷ c/d = a/b × d/c",
        "To divide a fraction: Multiply by the reciprocal of the divisor",
        "Simplify result if possible after operation"
    ],

    wrapping_up_multiplication_division: [
        "Standard algorithm for multiplication: Multiply digits by place value and add",
        "Partial quotients for division: Break dividend into easier chunks",
        "Estimation: Round numbers to nearest 10 or 100 to estimate result",
        "Check answer: Multiply quotient by divisor to verify"
    ],

    place_value_decimal_operations: [
        "Place value: Thousandths = 1/1000",
        "Add/Subtract decimals: Line up decimal points before operation",
        "Multiply decimals: Multiply as whole numbers and place decimal by total decimal places",
        "Divide decimals: Move decimal to make divisor whole, shift dividend the same"
    ],

    more_decimal_fraction_operations: [
        "Power of 10: 10ⁿ = 1 followed by n zeros",
        "Multiply by 10: Move decimal one place to the right",
        "Add/Subtract fractions: Convert to like denominators before operation",
        "Estimate: Round values for quick mental math and checking"
    ],

    shapes_coordinate_grid: [
        "Coordinate point: Ordered pair (x, y) on a grid",
        "Distance between points on same axis = |difference| (absolute value)",
        "Patterns: Analyze changes in x or y between points",
        "Quadrants: I (+,+), II (−,+), III (−,−), IV (+,−)"
    ],

    // Grade 6 topics
    reasoning_to_find_area: [
        "Area of rectangle = length × width",
        "Area of parallelogram = base × height",
        "Area of triangle = ½ × base × height",
        "Surface Area = sum of the areas of all faces",
        "Volume of cube = side³"
    ],

    introducing_ratios: [
        "Ratio = a : b or a/b",
        "Equivalent ratios: a/b = (a×n)/(b×n)",
        "Unit Rate = a/b where b = 1",
        "Ratio in part:part:whole model = part1 + part2 = whole"
    ],

    unit_rates_and_percentages: [
        "Unit Rate = total ÷ quantity",
        "Percentage = (part ÷ whole) × 100%",
        "Percent Increase = (Increase ÷ Original) × 100%",
        "Percent Decrease = (Decrease ÷ Original) × 100%"
    ],

    dividing_fractions: [
        "a ÷ b = a × (1/b)",
        "To divide fractions: a/b ÷ c/d = a/b × d/c",
        "Volume example with fraction: Volume = length × width × height (can be fractions)"
    ],

    arithmetic_in_base_ten: [
        "Addition/Subtraction: Line up decimal points",
        "Multiplying decimals: Multiply as whole numbers, then count decimal places in result",
        "Dividing decimals: Move decimal point in divisor and dividend to make divisor whole"
    ],

    expressions_and_equations: [
        "Equation: An expression with an '=' sign",
        "Evaluate expression: Replace variables with values and solve",
        "Exponents: aⁿ = a × a × ... × a (n times)",
        "Solving equations: Use inverse operations to isolate the variable"
    ],

    rational_numbers: [
        "Absolute Value: |a| = distance from 0 on number line",
        "Opposite numbers: -a and a",
        "Greatest Common Factor (GCF): Largest number dividing both",
        "Coordinate plane: Points plotted as (x, y) in quadrants I–IV"
    ],

    data_sets_and_distributions: [
        "Mean = (sum of values) ÷ (number of values)",
        "Median = middle value in ordered list",
        "Mode = most frequent value",
        "Range = maximum − minimum",
        "Interquartile Range (IQR) = Q3 − Q1"
    ],

    // Grade 7 topics

    scale_drawings: [
        "Scale Factor = Drawing Length ÷ Actual Length",
        "Actual Length = Drawing Length ÷ Scale Factor",
        "Area Scale Factor = (Scale Factor)²"
    ],

    introducing_proportional_relationships: [
        "Proportional Relationship: y = kx",
        "Constant of Proportionality (k) = y ÷ x",
        "A proportional graph passes through the origin",
        "A table with equal ratios shows a proportional relationship"
    ],

    measuring_circles: [
        "Circumference of a circle = 2πr or πd",
        "Area of a circle = πr²",
        "Radius = Diameter ÷ 2",
        "Arc Length = (θ ÷ 360) × 2πr",
        "Area of a Sector = (θ ÷ 360) × πr²"
    ],

    proportional_relationships_and_percentages: [
        "Percent Change = (Change ÷ Original) × 100%",
        "Percent Increase = (New − Original) ÷ Original × 100%",
        "Percent Decrease = (Original − New) ÷ Original × 100%",
        "Simple Interest = (Principal × Rate × Time) ÷ 100"
    ],

    rational_number_arithmetic: [
        "Add/Subtract: Convert to common denominator",
        "Multiply: a/b × c/d = (a × c) ÷ (b × d)",
        "Divide: a/b ÷ c/d = a/b × d/c",
        "Sign rules:\n(+)(+) = +, (−)(−) = +, (+)(−) = −"
    ],

    expressions_equations_and_inequalities: [
        "Distributive Property: a(b + c) = ab + ac",
        "To solve equations: Use inverse operations to isolate variable",
        "Linear equation: px + q = r",
        "When multiplying/dividing by a negative in inequalities, flip the sign",
        "Combine like terms before solving"
    ],

    angles_triangles_and_prisms: [
        "Sum of angles in a triangle = 180°",
        "Complementary angles add up to 90°",
        "Supplementary angles add up to 180°",
        "Volume of a prism = Base Area × Height",
        "Surface Area = Sum of areas of all faces"
    ],

    probability_and_sampling: [
        "Probability = (Number of favorable outcomes) ÷ (Total number of outcomes)",
        "Complement: P(not A) = 1 − P(A)",
        "Compound Events (independent): P(A and B) = P(A) × P(B)",
        "Sample Mean = Sum of all values ÷ Number of values"
    ],

    // Grade 8 topics

    rigid_transformations_and_congruence: [
        "Translation: (x, y) → (x + a, y + b)",
        "Reflection over x-axis: (x, y) → (x, -y)",
        "Reflection over y-axis: (x, y) → (-x, y)",
        "Rotation 90° clockwise: (x, y) → (y, -x)",
        "Rotation 90° counter-clockwise: (x, y) → (-y, x)",
        "Rigid transformations preserve distance and angle measures",
        "Congruent figures have the same size and shape"
    ],

    dilations_similarity_and_introducing_slope: [
        "Dilation: (x, y) → (k × x, k × y)",
        "Slope = (y₂ - y₁) ÷ (x₂ - x₁)",
        "Similar figures: same angles, proportional sides",
        "Scale Factor = image length ÷ original length"
    ],

    linear_relationships: [
        "y = mx + b (Slope-Intercept Form)",
        "m = (y₂ - y₁) ÷ (x₂ - x₁)",
        "b = y-intercept",
        "Direct Proportion: y = kx"
    ],

    linear_equations_and_linear_systems: [
        "Linear equation: ax + b = 0",
        "System of equations: solve by substitution, elimination, or graphing",
        "Infinite solutions: same line",
        "No solution: parallel lines",
        "One solution: point of intersection"
    ],

    functions_and_volume: [
        "Function: each input has exactly one output",
        "Volume of cylinder = π × r² × h",
        "Volume of cone = (1/3) × π × r² × h",
        "Volume of sphere = (4/3) × π × r³",
        "Rate of change = Δy ÷ Δx"
    ],

    associations_in_data: [
        "Positive Association: both variables increase",
        "Negative Association: one increases, the other decreases",
        "No Association: no clear pattern",
        "Line of best fit: approximates trend in data"
    ],

    exponents_and_scientific_notation: [
        "aⁿ × aᵐ = aⁿ⁺ᵐ",
        "aⁿ ÷ aᵐ = aⁿ⁻ᵐ",
        "(aⁿ)ᵐ = aⁿ⋅ᵐ",
        "a⁰ = 1 (a ≠ 0)",
        "a⁻ⁿ = 1 ÷ aⁿ",
        "Scientific notation: a × 10ⁿ (1 ≤ a < 10)"
    ],

    pythagorean_theorem_and_irrational_numbers: [
        "a² + b² = c² (right triangle)",
        "c = hypotenuse",
        "Distance = √[(x₂ - x₁)² + (y₂ - y₁)²]",
        "Irrational numbers: non-terminating, non-repeating decimals",
        "Perfect square: square root is an integer"
    ]
};

export const TOPIC_EXAMPLES = {
    introducing_multiplication: [
        {
            question: "What is 4 × 3 and how is it the same as 3 × 4?",
            solution: "4 × 3 = 12 and 3 × 4 = 12. According to the Commutative Property, changing the order of the factors doesn't change the product."
        },
        {
            question: "Show that (2 × 3) × 4 is equal to 2 × (3 × 4).",
            solution: "(2 × 3) × 4 = 6 × 4 = 24 and 2 × (3 × 4) = 2 × 12 = 24. The product remains the same. This is the Associative Property of multiplication."
        },
        {
            question: "Multiply 5 × 1. What does it show?",
            solution: "5 × 1 = 5. This demonstrates the Multiplicative Identity Property — multiplying any number by 1 gives the number itself."
        },
        {
            question: "Multiply 7 × 0. What happens?",
            solution: "7 × 0 = 0. Any number times 0 equals 0. This is the Zero Property of multiplication."
        }
    ],
    area_and_multiplication: [
        {
            question: "Find the area of a rectangle with length 5 and width 3.",
            solution: "Area = length × width = 5 × 3 = 15 square units."
        },
        {
            question: "What is the area if l = 6 and w = 2?",
            solution: "Area = 6 × 2 = 12 sq units."
        },
        {
            question: "Find total area of composite figure with rectangles 6×2 and 4×3.",
            solution: "Area = 6 × 2 + 4 × 3 = 12 + 12 = 24 sq units."
        }
    ],
    relating_multiplication_to_division: [
        {
            question: "If 12 ÷ 3 = 4, what is the multiplication equation?",
            solution: "12 = 3 × 4. Division is the inverse of multiplication."
        },
        {
            question: "Write a multiplication equation for 20 ÷ 5 = 4.",
            solution: "20 = 5 × 4."
        }
    ],
    fractions_as_numbers: [
        {
            question: "What is the fraction for 3 parts out of 8?",
            solution: "Fraction = 3/8."
        },
        {
            question: "Are 2/4 and 1/2 equivalent fractions?",
            solution: "Yes, they are equivalent because 2/4 = (2×1)/(4×1) = 1/2."
        },
        {
            question: "Add 1/4 + 2/4.",
            solution: "1/4 + 2/4 = (1+2)/4 = 3/4."
        }
    ],
    factors_and_multiples: [
        {
            question: "List the factors of 12.",
            solution: "Factors of 12 are 1, 2, 3, 4, 6, and 12."
        },
        {
            question: "What are the first five multiples of 3?",
            solution: "Multiples of 3 are 3, 6, 9, 12, and 15."
        },
        {
            question: "Find the GCF of 18 and 24.",
            solution: "GCF is 6."
        },
        {
            question: "Find the LCM of 4 and 5.",
            solution: "LCM is 20."
        }
    ],
    fraction_equivalence_comparison: [
        {
            question: "Are 2/3 and 4/6 equivalent fractions?",
            solution: "Yes, because 2/3 = (2×2)/(3×2) = 4/6."
        },
        {
            question: "Compare 1/4 and 2/5.",
            solution: "1/4 < 2/5 because 1×5 < 2×4 (cross multiplication)."
        }
    ],
    extending_operations_fractions: [
        {
            question: "Add 1/3 + 2/3.",
            solution: "1/3 + 2/3 = (1+2)/3 = 3/3 = 1."
        },
        {
            question: "Subtract 5/6 - 1/6.",
            solution: "5/6 - 1/6 = (5-1)/6 = 4/6 = 2/3."
        },
        {
            question: "Add 1/4 + 1/8.",
            solution: "Convert to like denominators: 1/4 = 2/8, so 2/8 + 1/8 = 3/8."
        },
        {
            question: "Multiply 2/5 × 3.",
            solution: "2/5 × 3 = (2×3)/5 = 6/5 or 1 and 1/5."
        }
    ],
    hundredths_to_hundred_thousands: [
        {
            question: "Convert 0.75 to hundredths.",
            solution: "0.75 = 75/100."
        },
        {
            question: "Round 3.456 to the nearest hundredth.",
            solution: "3.456 rounded to the nearest hundredth is 3.46."
        },
        {
            question: "Add 0.2 + 0.05.",
            solution: "0.2 + 0.05 = 0.25."
        }
    ],
    multiplicative_comparison_measurement: [
        {
            question: "If a pencil is 15 cm long, how many centimeters is it in meters?",
            solution: "15 cm = 0.15 m (since 1 m = 100 cm)."
        },
        {
            question: "Convert 2 kg to grams.",
            solution: "2 kg = 2000 g (since 1 kg = 1000 g)."
        },
        {
            question: "If a rope is 3 minutes long, how many seconds is that?",
            solution: "3 minutes = 180 seconds (since 1 minute = 60 seconds)."
        }
    ],
    multiplying_dividing_multi_digit: [
        {
            question: "Multiply 23 × 45 using long multiplication.",
            solution: "23 × 45 = 1035."
        },
        {
            question: "Divide 144 by 12 using long division.",
            solution: "144 ÷ 12 = 12."
        },
        {
            question: "Estimate the product of 47 and 36.",
            solution: "Estimate: 50 × 40 = 2000."
        }
    ],
    // Grade 4 Examples
    factors_and_multiples: [
        {
            question: "What are the factors of 18?",
            solution: "Factors of 18 are the numbers that divide it evenly: 1, 2, 3, 6, 9, and 18."
        },
        {
            question: "What is the 5th multiple of 4?",
            solution: "Multiples of 4: 4, 8, 12, 16, 20. So, the 5th multiple is 20."
        },
        {
            question: "Find the common factors of 12 and 20.",
            solution: "Factors of 12: 1, 2, 3, 4, 6, 12; Factors of 20: 1, 2, 4, 5, 10, 20 → Common: 1, 2, 4."
        },
        {
            question: "What is the GCF of 16 and 24?",
            solution: "GCF of 16 and 24 is 8 because it’s the greatest number dividing both."
        },
        {
            question: "What is the LCM of 3 and 5?",
            solution: "Multiples of 3: 3, 6, 9, 12, 15... Multiples of 5: 5, 10, 15... LCM = 15."
        }
    ],

    fraction_equivalence_comparison: [
        {
            question: "Are 3/6 and 1/2 equivalent?",
            solution: "Yes. 3/6 = (3÷3)/(6÷3) = 1/2."
        },
        {
            question: "Which is greater: 2/5 or 3/7?",
            solution: "Use cross multiplication: 2×7 = 14, 3×5 = 15 → 15 > 14 → So 3/7 > 2/5."
        },
        {
            question: "Put in order: 1/2, 3/4, 2/3.",
            solution: "Convert to common denominator: 6/12, 9/12, 8/12 → Order: 1/2, 2/3, 3/4."
        }
    ],

    extending_operations_fractions: [
        {
            question: "Add 2/5 + 1/5.",
            solution: "Same denominators: 2/5 + 1/5 = (2+1)/5 = 3/5."
        },
        {
            question: "Subtract 4/6 - 1/6.",
            solution: "4/6 - 1/6 = (4-1)/6 = 3/6 = 1/2."
        },
        {
            question: "Add 1/3 + 1/4.",
            solution: "LCM of 3 and 4 = 12 → Convert: 4/12 + 3/12 = 7/12."
        },
        {
            question: "Add 0.4 and 0.08.",
            solution: "Convert 0.4 = 40/100, 0.08 = 8/100 → Add: 48/100 = 0.48."
        },
        {
            question: "Multiply 2/3 × 6.",
            solution: "2/3 × 6 = (2×6)/3 = 12/3 = 4."
        }
    ],

    hundredths_to_hundred_thousands: [
        {
            question: "What is the place value of 5 in 3.254?",
            solution: "The 5 is in the hundredths place. Value = 0.05."
        },
        {
            question: "Compare 3.12 and 3.09.",
            solution: "Compare digits from left: 3 = 3, 1 > 0 → So 3.12 > 3.09."
        },
        {
            question: "Round 6.478 to the nearest tenth.",
            solution: "Check hundredths: 7 → round up → 6.5."
        },
        {
            question: "Add 0.3 + 0.07.",
            solution: "Line up decimals → 0.30 + 0.07 = 0.37."
        }
    ],

    multiplicative_comparison_measurement: [
        {
            question: "If a chair is 3 times taller than a stool of 0.5 meters, how tall is the chair?",
            solution: "3 × 0.5 = 1.5 meters."
        },
        {
            question: "Convert 3.2 meters to centimeters.",
            solution: "1 m = 100 cm → 3.2 × 100 = 320 cm."
        },
        {
            question: "Convert 2500 g to kilograms.",
            solution: "1 kg = 1000 g → 2500 ÷ 1000 = 2.5 kg."
        },
        {
            question: "Convert 4.5 minutes to seconds.",
            solution: "1 minute = 60 sec → 4.5 × 60 = 270 seconds."
        }
    ],

    multiplying_dividing_multi_digit: [
        {
            question: "Multiply 34 × 12 using estimation.",
            solution: "Estimate: 30 × 10 = 300."
        },
        {
            question: "Use long multiplication to solve 23 × 15.",
            solution: "23 × 15 = 345."
        },
        {
            question: "Divide 144 ÷ 12 using long division.",
            solution: "144 ÷ 12 = 12."
        },
        {
            question: "Check your division: 13 × 7 + 1 = ?",
            solution: "13 × 7 = 91, 91 + 1 = 92 → Check passed if dividend was 92."
        }
    ],

    angles_angle_measurement: [
        {
            question: "What type of angle is 45°?",
            solution: "It is an acute angle because it is less than 90°."
        },
        {
            question: "What type of angle measures exactly 90°?",
            solution: "A right angle measures 90°."
        },
        {
            question: "Is an angle of 135° obtuse?",
            solution: "Yes, because it is greater than 90° and less than 180°."
        },
        {
            question: "How many degrees are there in a straight angle and a full angle?",
            solution: "A straight angle is 180° and a full angle is 360°."
        },
        {
            question: "If ∠A = 40° and ∠B = 50°, and they are adjacent angles that form ∠C, what is ∠C?",
            solution: "∠C = ∠A + ∠B = 40° + 50° = 90°."
        }
    ],

    properties_two_dimensional_shapes: [
        {
            question: "How many degrees are in the interior angles of a triangle?",
            solution: "Triangle sum = 180°."
        },
        {
            question: "What are the properties of a square?",
            solution: "All sides equal, all angles 90°."
        },
        {
            question: "Is a square a rectangle?",
            solution: "Yes, because it has all right angles and opposite sides equal."
        },
        {
            question: "What makes two lines parallel?",
            solution: "They never intersect and are always the same distance apart."
        }
    ],
    // Grade 5 Examples
    finding_volume: [
        {
            question: "What is the volume of a rectangular prism with length 5 cm, width 3 cm, and height 2 cm?",
            solution: "Volume = l × w × h = 5 × 3 × 2 = 30 cm³."
        },
        {
            question: "Calculate the volume of a right rectangular prism with dimensions l=4 cm, w=2 cm, h=5 cm.",
            solution: "Volume = 4 × 2 × 5 = 40 cm³."
        },
        {
            question: "What is the volume of a cube with side length 4 cm?",
            solution: "Volume = s³ = 4³ = 64 cm³."
        },
        {
            question: "Find the volume of a cylinder with radius 3 cm and height 10 cm.",
            solution: "Volume = π × r² × h = π × 3² × 10 = 90π ≈ 282.74 cm³."
        },
        {
            question: "What is the volume of a cone with radius 2 cm and height 9 cm?",
            solution: "Volume = (1/3) × π × 2² × 9 = (1/3) × π × 4 × 9 = 12π ≈ 37.70 cm³."
        },
        {
            question: "Find the total volume of two boxes with volumes of 24 cm³ and 36 cm³.",
            solution: "Total volume = 24 + 36 = 60 cm³."
        }
    ],

    fractions_as_quotients_multiplication: [
        {
            question: "Write 7 divided by 4 as a fraction.",
            solution: "7 ÷ 4 = 7/4."
        },
        {
            question: "Multiply 2/3 by 6.",
            solution: "2/3 × 6 = (2 × 6)/3 = 12/3 = 4."
        },
        {
            question: "Find the area of a square with side 2/5.",
            solution: "Area = (2/5)² = 4/25."
        },
        {
            question: "Express the quotient of 9 and 5 as a fraction.",
            solution: "9 ÷ 5 = 9/5."
        }
    ],

    multiplying_dividing_fractions: [
        {
            question: "Multiply 2/3 × 4/5.",
            solution: "2/3 × 4/5 = (2 × 4)/(3 × 5) = 8/15."
        },
        {
            question: "Divide 5/6 by 2/3.",
            solution: "5/6 ÷ 2/3 = 5/6 × 3/2 = 15/12 = 1 and 1/4."
        },
        {
            question: "How do you divide fractions?",
            solution: "Multiply by the reciprocal of the divisor."
        },
        {
            question: "Simplify 6/9 × 3/4.",
            solution: "6/9 × 3/4 = 18/36 = 1/2."
        }
    ],

    wrapping_up_multiplication_division: [
        {
            question: "Use standard algorithm to multiply 34 × 6.",
            solution: "34 × 6 = 204."
        },
        {
            question: "Use partial quotients to divide 96 by 4.",
            solution: "4 × 20 = 80, remainder = 16 → 4 × 4 = 16 → total = 24."
        },
        {
            question: "Estimate 72 × 49.",
            solution: "Estimate: 70 × 50 = 3500."
        },
        {
            question: "Check the answer: If 24 ÷ 3 = 8, does 8 × 3 = 24?",
            solution: "Yes, 8 × 3 = 24 confirms the division was correct."
        }
    ],

    place_value_decimal_operations: [
        {
            question: "What is the place value of the digit 7 in 0.007?",
            solution: "It is in the thousandths place, so value = 7/1000."
        },
        {
            question: "Add 3.42 + 5.7.",
            solution: "3.42 + 5.70 = 9.12 (line up decimal points)."
        },
        {
            question: "Multiply 1.5 × 2.3.",
            solution: "15 × 23 = 345 → 2 decimal places → 3.45."
        },
        {
            question: "Divide 2.4 by 0.6.",
            solution: "Move decimal: 24 ÷ 6 = 4."
        }
    ],

    more_decimal_fraction_operations: [
        {
            question: "What is 10³?",
            solution: "10 × 10 × 10 = 1000."
        },
        {
            question: "What happens when you multiply 4.5 by 10?",
            solution: "Move decimal right → 45."
        },
        {
            question: "Add 3/4 + 2/8.",
            solution: "Convert 2/8 to 1/4 → 3/4 + 1/4 = 1."
        },
        {
            question: "Estimate 7.6 + 1.9.",
            solution: "Estimate: 8 + 2 = 10."
        }
    ],

    shapes_coordinate_grid: [
        {
            question: "What are the coordinates of a point 4 units right and 3 units up from origin?",
            solution: "(4, 3)"
        },
        {
            question: "What is the distance between (2, 0) and (7, 0)?",
            solution: "|7 - 2| = 5 units."
        },
        {
            question: "Find the pattern in the sequence: (1,2), (2,4), (3,6).",
            solution: "y = 2x → double the x-value."
        },
        {
            question: "Which quadrant does the point (-2, -3) lie in?",
            solution: "Quadrant III."
        }
    ],
    reasoning_to_find_area: [
        {
            question: "What is the area of a rectangle with length 7 cm and width 4 cm?",
            solution: "Area = length × width = 7 × 4 = 28 cm²."
        },
        {
            question: "Find the area of a parallelogram with base 5 cm and height 6 cm.",
            solution: "Area = base × height = 5 × 6 = 30 cm²."
        },
        {
            question: "Calculate the area of a triangle with base 10 cm and height 3 cm.",
            solution: "Area = ½ × base × height = ½ × 10 × 3 = 15 cm²."
        },
        {
            question: "A cube has sides of 3 cm. What is its surface area?",
            solution: "Surface Area = 6 × side² = 6 × 9 = 54 cm²."
        },
        {
            question: "Find the volume of a cube with side length 4 cm.",
            solution: "Volume = side³ = 4 × 4 × 4 = 64 cm³."
        }
    ],

    introducing_ratios: [
        {
            question: "What is the ratio of 3 apples to 9 oranges?",
            solution: "Ratio = 3:9 or 1:3 after simplification."
        },
        {
            question: "Are 2:3 and 6:9 equivalent ratios?",
            solution: "Yes, 2/3 = 6/9. Both reduce to the same value."
        },
        {
            question: "What is the unit rate for 12 km in 3 hours?",
            solution: "Unit Rate = 12 ÷ 3 = 4 km/h."
        },
        {
            question: "If the ratio of cats to dogs is 2:3, how many total animals?",
            solution: "2 + 3 = 5 parts."
        }
    ],

    unit_rates_and_percentages: [
        {
            question: "A bus travels 180 miles in 3 hours. Find the unit rate.",
            solution: "Unit Rate = 180 ÷ 3 = 60 miles/hour."
        },
        {
            question: "What percent is 25 out of 100?",
            solution: "Percentage = (25 ÷ 100) × 100 = 25%."
        },
        {
            question: "Price increased from $40 to $60. What’s the percent increase?",
            solution: "Increase = 20 → (20 ÷ 40) × 100 = 50%."
        },
        {
            question: "Original value = 80, New value = 60. What’s percent decrease?",
            solution: "Decrease = 20 → (20 ÷ 80) × 100 = 25%."
        }
    ],

    dividing_fractions: [
        {
            question: "What is 1 ÷ 2 written as a fraction?",
            solution: "1 ÷ 2 = 1/2."
        },
        {
            question: "Divide 2/3 by 4/5.",
            solution: "2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6."
        },
        {
            question: "Find volume if length = 1/2 m, width = 2 m, height = 3 m.",
            solution: "Volume = 1/2 × 2 × 3 = 3 m³."
        }
    ],

    arithmetic_in_base_ten: [
        {
            question: "Add 4.52 and 3.6.",
            solution: "Align decimal: 4.52 + 3.60 = 8.12."
        },
        {
            question: "Multiply 0.3 × 0.5.",
            solution: "3 × 5 = 15 → two decimal places → 0.15."
        },
        {
            question: "Divide 1.2 by 0.4.",
            solution: "Move decimal: 12 ÷ 4 = 3."
        }
    ],

    expressions_and_equations: [
        {
            question: "Evaluate: 2x + 3 when x = 5.",
            solution: "2×5 + 3 = 10 + 3 = 13."
        },
        {
            question: "What is 3²?",
            solution: "3² = 3 × 3 = 9."
        },
        {
            question: "Solve: 5x = 20.",
            solution: "x = 20 ÷ 5 = 4."
        },
        {
            question: "Use inverse operation to solve: x + 6 = 14.",
            solution: "x = 14 − 6 = 8."
        }
    ],

    rational_numbers: [
        {
            question: "What is the absolute value of -8?",
            solution: "|-8| = 8."
        },
        {
            question: "What is the opposite of 6?",
            solution: "Opposite = -6."
        },
        {
            question: "Find the GCF of 16 and 24.",
            solution: "GCF = 8."
        },
        {
            question: "Plot the point (−2, 3). Which quadrant is it in?",
            solution: "Quadrant II."
        }
    ],

    data_sets_and_distributions: [
        {
            question: "Find the mean of 3, 5, 7.",
            solution: "Mean = (3+5+7)/3 = 15/3 = 5."
        },
        {
            question: "What’s the median of 1, 4, 6, 9, 12?",
            solution: "Median = 6."
        },
        {
            question: "What is the mode of 2, 2, 3, 5, 2?",
            solution: "Mode = 2."
        },
        {
            question: "Find the range of 4, 9, 1, 6.",
            solution: "Range = 9 − 1 = 8."
        },
        {
            question: "If Q1 = 15 and Q3 = 25, what is the IQR?",
            solution: "IQR = 25 − 15 = 10."
        }
    ],
    //   Grade 7 Examples
    scale_drawings: [
        {
            question: "A drawing length is 5 cm and actual length is 20 cm. What is the scale factor?",
            solution: "Scale Factor = Drawing ÷ Actual = 5 ÷ 20 = 1/4"
        },
        {
            question: "If the drawing length is 8 cm and scale factor is 1/2, what is the actual length?",
            solution: "Actual Length = Drawing ÷ Scale Factor = 8 ÷ (1/2) = 16 cm"
        },
        {
            question: "What is the area scale factor if the scale factor is 3?",
            solution: "Area Scale Factor = 3² = 9"
        }
    ],

    introducing_proportional_relationships: [
        {
            question: "If y = 10 when x = 2, is this a proportional relationship?",
            solution: "Yes, because y = kx → 10 = k×2 → k = 5 → y = 5x"
        },
        {
            question: "What is the constant of proportionality if x = 4 and y = 12?",
            solution: "k = y ÷ x = 12 ÷ 4 = 3"
        },
        {
            question: "Does a graph passing through (0,0) indicate proportionality?",
            solution: "Yes, a proportional graph must pass through the origin (0,0)"
        },
        {
            question: "Does the table x: [3,6,9] and y: [9,18,27] show proportionality?",
            solution: "Yes, since y ÷ x = 3 in all cases → constant ratio"
        }
    ],

    measuring_circles: [
        {
            question: "Find the circumference of a circle with radius 5 cm.",
            solution: "C = 2πr = 2 × π × 5 = 10π ≈ 31.42 cm"
        },
        {
            question: "Find the area of a circle with radius 7 m.",
            solution: "A = πr² = π × 49 ≈ 153.94 m²"
        },
        {
            question: "What is the radius of a circle with diameter 12 cm?",
            solution: "Radius = Diameter ÷ 2 = 12 ÷ 2 = 6 cm"
        },
        {
            question: "Find the arc length of a 90° sector in a circle of radius 4 cm.",
            solution: "Arc Length = (90 ÷ 360) × 2π × 4 = 1/4 × 8π = 2π ≈ 6.28 cm"
        },
        {
            question: "Find the area of a 120° sector in a circle of radius 6 cm.",
            solution: "Area = (120 ÷ 360) × π × 36 = 1/3 × 36π = 12π ≈ 37.70 cm²"
        }
    ],

    proportional_relationships_and_percentages: [
        {
            question: "What is the percent change from 80 to 100?",
            solution: "Change = 20 → Percent Change = (20 ÷ 80) × 100 = 25%"
        },
        {
            question: "What is the percent increase from 60 to 75?",
            solution: "Increase = 15 → (15 ÷ 60) × 100 = 25%"
        },
        {
            question: "What is the percent decrease from 120 to 90?",
            solution: "Decrease = 30 → (30 ÷ 120) × 100 = 25%"
        },
        {
            question: "Find simple interest on $500 at 4% for 3 years.",
            solution: "SI = (500 × 4 × 3) ÷ 100 = $60"
        }
    ],

    rational_number_arithmetic: [
        {
            question: "Add -3/4 and 1/2.",
            solution: "-3/4 + 1/2 = -1/4 (Convert to common denominator)"
        },
        {
            question: "Multiply 2/3 × 5/7.",
            solution: "Result = (2 × 5) ÷ (3 × 7) = 10 ÷ 21"
        },
        {
            question: "Divide 4/5 ÷ 2/3.",
            solution: "4/5 × 3/2 = 12/10 = 6/5"
        },
        {
            question: "What is the sign of (−7) × (+3)?",
            solution: "(−)(+) = − → Answer: −21"
        }
    ],

    expressions_equations_and_inequalities: [
        {
            question: "Simplify: 2(3x − 4).",
            solution: "6x − 8 (using distributive property)"
        },
        {
            question: "Solve: 5x − 10 = 0.",
            solution: "5x = 10 → x = 2"
        },
        {
            question: "What happens when you divide both sides of an inequality by a negative number?",
            solution: "You must flip the inequality sign."
        },
        {
            question: "Combine: 3x + 5 − 2x − 1.",
            solution: "Result = (3x − 2x) + (5 − 1) = x + 4"
        }
    ],

    angles_triangles_and_prisms: [
        {
            question: "If a triangle has angles 70° and 60°, what is the third angle?",
            solution: "180 − (70 + 60) = 50°"
        },
        {
            question: "What is the complement of 25°?",
            solution: "90 − 25 = 65°"
        },
        {
            question: "Find the supplement of 135°.",
            solution: "180 − 135 = 45°"
        },
        {
            question: "What is the volume of a prism with base 12 cm² and height 5 cm?",
            solution: "V = 12 × 5 = 60 cm³"
        },
        {
            question: "If the faces have areas 15, 20, and 25 cm², what is the surface area?",
            solution: "SA = 2 × (15 + 20 + 25) = 2 × 60 = 120 cm²"
        }
    ],

    probability_and_sampling: [
        {
            question: "What is the probability of picking a red marble from a bag of 3 red and 7 blue marbles?",
            solution: "P = 3 ÷ (3 + 7) = 3/10 = 0.3"
        },
        {
            question: "If P(A) = 0.2, what is P(not A)?",
            solution: "1 − 0.2 = 0.8"
        },
        {
            question: "If P(A) = 0.4 and P(B) = 0.5, what is P(A and B) assuming independence?",
            solution: "P(A and B) = 0.4 × 0.5 = 0.2"
        },
        {
            question: "Find the sample mean of the values [4, 8, 6, 2].",
            solution: "(4 + 8 + 6 + 2) ÷ 4 = 20 ÷ 4 = 5"
        }
    ],

    // Grade 8 Examples
    rigid_transformations_and_congruence: [
        {
            question: "Translate the point (3, 2) by (x + 4, y − 1). What is the image?",
            solution: "(3 + 4, 2 − 1) = (7, 1)"
        },
        {
            question: "Reflect the point (5, −3) over the x-axis.",
            solution: "Reflection: (5, −3) → (5, 3)"
        },
        {
            question: "Reflect the point (−2, 4) over the y-axis.",
            solution: "Reflection: (−2, 4) → (2, 4)"
        },
        {
            question: "Rotate the point (1, 3) 90° clockwise around the origin.",
            solution: "(1, 3) → (3, −1)"
        },
        {
            question: "Rotate (2, −5) 90° counter-clockwise around the origin.",
            solution: "(2, −5) → (5, 2)"
        },
        {
            question: "Does a reflection preserve distance and angle?",
            solution: "Yes, all rigid transformations preserve distance and angle measures."
        },
        {
            question: "Are congruent figures always same size and shape?",
            solution: "Yes, congruent figures have the same size and shape."
        }
    ],

    dilations_similarity_and_introducing_slope: [
        {
            question: "Dilate (3, 2) by a factor of 2.",
            solution: "(3×2, 2×2) = (6, 4)"
        },
        {
            question: "Find slope between (1, 2) and (5, 6).",
            solution: "(6 − 2) ÷ (5 − 1) = 4 ÷ 4 = 1"
        },
        {
            question: "Two triangles have equal angles and proportional sides. Are they similar?",
            solution: "Yes, because similar figures have same angles and proportional sides."
        },
        {
            question: "Find scale factor if original length = 4 and image length = 12.",
            solution: "Scale factor = 12 ÷ 4 = 3"
        }
    ],

    linear_relationships: [
        {
            question: "Identify m and b in y = 2x + 3.",
            solution: "m = 2 (slope), b = 3 (y-intercept)"
        },
        {
            question: "Find slope between (2, 3) and (4, 7).",
            solution: "(7 − 3) ÷ (4 − 2) = 4 ÷ 2 = 2"
        },
        {
            question: "What's the y-intercept of y = −4x + 9?",
            solution: "b = 9"
        },
        {
            question: "Is y = 6x a direct proportion?",
            solution: "Yes, it’s in the form y = kx and goes through origin."
        }
    ],

    linear_equations_and_linear_systems: [
        {
            question: "Solve: 4x − 8 = 0",
            solution: "4x = 8 → x = 2"
        },
        {
            question: "How to solve a system: y = 2x and x + y = 6?",
            solution: "Use substitution: y = 2x → x + 2x = 6 → 3x = 6 → x = 2, y = 4 → (2, 4)"
        },
        {
            question: "What if both equations in a system are the same line?",
            solution: "Infinite solutions."
        },
        {
            question: "What if the lines are parallel?",
            solution: "No solution — lines never meet."
        },
        {
            question: "What happens if two lines intersect at one point?",
            solution: "One solution exists — the point of intersection."
        }
    ],

    functions_and_volume: [
        {
            question: "Is {(1,2), (2,4), (3,6)} a function?",
            solution: "Yes, each input has one output."
        },
        {
            question: "Volume of a cylinder with r = 2 and h = 10?",
            solution: "π × 2² × 10 = 40π ≈ 125.66 units³"
        },
        {
            question: "Volume of a cone with r = 3, h = 6?",
            solution: "(1/3) × π × 9 × 6 = 18π ≈ 56.55 units³"
        },
        {
            question: "Volume of sphere with r = 2?",
            solution: "(4/3) × π × 8 = (32/3)π ≈ 33.51 units³"
        },
        {
            question: "Rate of change between (1, 5) and (3, 11)?",
            solution: "Δy ÷ Δx = (11 − 5) ÷ (3 − 1) = 6 ÷ 2 = 3"
        }
    ],

    associations_in_data: [
        {
            question: "If study time increases and score increases, what type of association?",
            solution: "Positive Association"
        },
        {
            question: "If TV hours increase and grades drop, what association?",
            solution: "Negative Association"
        },
        {
            question: "Scatterplot shows random points. What association?",
            solution: "No Association"
        },
        {
            question: "What is the use of a line of best fit?",
            solution: "To show the general trend in data."
        }
    ],

    exponents_and_scientific_notation: [
        {
            question: "Simplify: 3² × 3³",
            solution: "3⁵ = 243"
        },
        {
            question: "Simplify: 6⁴ ÷ 6²",
            solution: "6² = 36"
        },
        {
            question: "Simplify: (2³)²",
            solution: "2⁶ = 64"
        },
        {
            question: "What is 9⁰?",
            solution: "1"
        },
        {
            question: "Simplify 2⁻³",
            solution: "1 ÷ 2³ = 1 ÷ 8 = 0.125"
        },
        {
            question: "Write 52,000 in scientific notation.",
            solution: "5.2 × 10⁴"
        }
    ],

    pythagorean_theorem_and_irrational_numbers: [
        {
            question: "Find c when a = 6, b = 8.",
            solution: "c² = 36 + 64 = 100 → c = 10"
        },
        {
            question: "What is the hypotenuse in triangle with legs 5 and 12?",
            solution: "c = √(25 + 144) = √169 = 13"
        },
        {
            question: "Distance between (1, 1) and (4, 5)?",
            solution: "√[(4−1)² + (5−1)²] = √[9 + 16] = √25 = 5"
        },
        {
            question: "Is √7 rational?",
            solution: "No, it’s irrational — non-repeating, non-terminating."
        },
        {
            question: "Is 81 a perfect square?",
            solution: "Yes, √81 = 9"
        }
    ]
};

