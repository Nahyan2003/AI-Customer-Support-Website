import re


def check_policy(question: str):
    """
    Check simple business rules before asking the LLM.
    Returns an answer if a deterministic rule can handle the question.
    Otherwise returns None.
    """

    question_lower = question.lower()

    # ---------------------------
    # Refund Policy
    # ---------------------------
    if "refund" in question_lower:

        # Find number of days in the question
        match = re.search(
            r"(\d+)\s*days?",
            question_lower
        )

        if match:

            customer_days = int(match.group(1))

            refund_limit = 30

            if customer_days <= refund_limit:

                return (
                    "Yes. You can request a refund within 30 days "
                    "of purchase, provided the product is unused "
                    "and in its original condition."
                )

            else:

                return (
                    "No. Refund requests are only accepted within "
                    "30 days of purchase."
                )

    # ---------------------------
    # Cancellation Policy
    # ---------------------------
    if "cancel" in question_lower:

        match = re.search(
            r"(\d+)\s*hours?",
            question_lower
        )

        if match:

            customer_hours = int(match.group(1))

            cancellation_limit = 2

            if customer_hours <= cancellation_limit:

                return (
                    "Yes. Orders can be cancelled within "
                    "2 hours of placing the order."
                )

            else:

                return (
                    "No. Orders can only be cancelled within "
                    "2 hours of placing the order."
                )

    # ---------------------------
    # No deterministic rule
    # ---------------------------
    return None
if __name__ == "__main__":

    questions = [
        "Can I get a refund after 20 days?",
        "Can I get a refund after 40 days?",
        "Can I cancel my order after 1 hour?",
        "Can I cancel my order after 5 hours?",
        "Do you provide international shipping?"
    ]

    for question in questions:

        answer = check_policy(question)

        print("\nQuestion:", question)
        print("Answer:", answer)