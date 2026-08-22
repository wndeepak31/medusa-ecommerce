import { AbstractPaymentProvider } from "@medusajs/framework/utils"
import { PaymentProviderError, PaymentProviderSessionResponse, PaymentSessionStatus } from "@medusajs/framework/types"

class ManualPaymentProvider extends AbstractPaymentProvider {
  static identifier = "manual"

  async capturePayment(
    paymentData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProviderError> {
    return { status: "captured" }
  }

  async authorizePayment(
    paymentSessionData: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<
    | PaymentProviderError
    | {
        status: PaymentSessionStatus
        data: PaymentProviderSessionResponse["data"]
      }
  > {
    return { status: "authorized" as PaymentSessionStatus, data: {} }
  }

  async cancelPayment(
    paymentData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProviderError> {
    return { status: "canceled" }
  }

  async initiatePayment(
    context: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    return { id: "dummy_session_" + Date.now(), data: {} }
  }

  async deletePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProviderError> {
    return {}
  }

  async getPaymentStatus(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentSessionStatus> {
    return "authorized" as PaymentSessionStatus
  }

  async refundPayment(
    paymentData: Record<string, unknown>,
    refundAmount: number
  ): Promise<Record<string, unknown> | PaymentProviderError> {
    return { status: "refunded" }
  }

  async updatePayment(
    context: Record<string, unknown>
  ): Promise<PaymentProviderError | PaymentProviderSessionResponse> {
    return { id: "dummy_session_updated", data: {} }
  }
}

export default ManualPaymentProvider
