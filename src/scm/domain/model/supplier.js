import {ValidationError} from "../../../shared/domain/model/errors.js";
import {Money} from "../../../shared/domain/model/money.js";
import {SupplierId} from "../../../shared/domain/model/supplier-id.js";

/**
 * Represents a supplier in the supply chain management (SCM) domain.
 * @remarks
 * This class captures information about a supplier, including their name, contact email, and the total price of their last order.
 */
export class Supplier {
    #id;
    #name;
    #contactEmail;
    #lastOrderTotalPrice;

    /**
     * Creates a new Supplier instance.
     * @param {Object} options - The options for creating the Supplier instance.
     * @param {SupplierId} options.id - The identifier of the supplier.
     * @param {string} options.name - The name of the supplier.
     * @param {string|null} [options.contactEmail=null] - The contact email of the supplier.
     * @param {Money|null} [options.lastOrderTotalPrice=null] - The total price of the supplier's last order.
     * @throws {ValidationError} If any of the provided parameters are invalid.
     */
    constructor({id, name, contactEmail = null, lastOrderTotalPrice = null}) {
        if (!(id instanceof SupplierId))
            throw new ValidationError("Supplier ID must be a valid SupplierID object");
        if (typeof name !== "string" || name.length < 2 || name.length > 100)
            throw new ValidationError("Supplier name must be a string between 2 and 100 characters");

        if (contactEmail !== null && !this.isValidEmail(contactEmail))
            throw new ValidationError("Supplier contactEmail must be a valid email address or null");

        if (lastOrderTotalPrice !== null && !(lastOrderTotalPrice instanceof Money))
            throw new ValidationError("Supplier lastOrderTotalPrice must be a money object or null");

        this.#id = id;
        this.#name = name;
        this.#contactEmail = contactEmail;
        this.#lastOrderTotalPrice = lastOrderTotalPrice;
    }

    /**
     * Validates if the provided email string is in a valid format.
     * @param {string} email - The email string to validate.
     * @returns {boolean} True if the email is valid, false otherwise.
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Gets the identifier of the supplier.
     * @returns {SupplierId} The supplier identifier.
     */
    get id() { return this.#id; }

    /**
     * Gets the name of the supplier.
     * @returns {string} The supplier name.
     */
    get name() { return this.#name; }

    /**
     * Gets the contact email of the supplier.
     * @returns {string|null} The contact email, or null if not provided.
     */
    get contactEmail() { return this.#contactEmail; }

    /**
     * Gets the total price of the supplier's last order.
     * @returns {Money|null} The last order total price, or null if not available.
     */
    get lastOrderTotalPrice() { return this.#lastOrderTotalPrice; }
}
