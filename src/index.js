/**
 * Main entry point for the application.
 * @remarks
 * This file serves as a demonstration of the domain models implemented in the project.
 * It exemplifies the creation and interaction of various entities and value objects
 * across the Shared, SCM (Supply Chain Management), and Procurement domains.
 */

import { Supplier } from "./scm/domain/model/supplier.js";
import { PurchaseOrderItem } from "./procurement/domain/model/purchase-order-item.js";
import { PurchaseOrderState } from "./procurement/domain/model/purchase-order-state.js";
import { Currency } from "./shared/domain/model/currency.js";
import { DateTime } from "./shared/domain/model/date-time.js";
import { Money } from "./shared/domain/model/money.js";
import { ProductId } from "./shared/domain/model/product-id.js";
import { SupplierId } from "./shared/domain/model/supplier-id.js";

/**
 * Executes a simulated workflow to demonstrate domain class instantiation,
 * behavior execution, and state transitions.
 */
console.log('Hello, welcome to the Supply Chain Management and Procurement System!');

try {
    const currency = new Currency('USD');
    const unitPrice = new Money({ amount: 15.50, currency });
    console.log(`Unit Price: ${unitPrice.amount} ${unitPrice.currency.code}`);

    const supplierId = SupplierId.generate();
    const supplier = new Supplier({
        id: supplierId,
        name: 'Acme Corp',
        contactEmail: 'contact@acme.com',
        lastOrderTotalPrice: unitPrice
    });
    console.log(`Supplier generated: ${supplier.name} (${supplier.id.value})`);

    const productId = ProductId.generate();
    const item = new PurchaseOrderItem({
        orderId: 'ORD-123',
        productId: productId,
        quantity: 10,
        unitPrice: unitPrice
    });

    const total = item.calculateItemTotal();
    console.log(`Order item total for 10 units: ${total.amount} ${total.currency.code}`);

    const state = new PurchaseOrderState();
    console.log(`Initial Order State: ${state.value}`);
    const nextState = state.toSubmittedFrom(state);
    console.log(`Next Order State: ${nextState.value}`);

    const dt = new DateTime();
    console.log(`Event created at: ${dt.toString()}`);

} catch (error) {
    console.error("Error during execution:", error.message);
}
