import { AbstractPaymentProvider } from "@medusajs/framework/utils"
import { PaymentSessionStatus } from "@medusajs/framework/types"

class ManualPaymentProvider extends AbstractPaymentProvider {
  static identifier = "manual"

  async capturePayment(paymentData: any): Promise<any> {
    return { status: "captured" }
  }

  async authorizePayment(input: any): Promise<any> {
    return { status: "authorized" as PaymentSessionStatus, data: {} }
  }

  async cancelPayment(paymentData: any): Promise<any> {
    return { status: "canceled" }
  }

  async initiatePayment(input: any): Promise<any> {
    return { id: "dummy_session_" + Date.now(), data: {} }
  }

  async deletePayment(paymentSessionData: any): Promise<any> {
    return {}
  }

  async getPaymentStatus(paymentSessionData: any): Promise<any> {
    return "authorized" as PaymentSessionStatus
  }

  async refundPayment(input: any): Promise<any> {
    return { status: "refunded" }
  }

  async updatePayment(input: any): Promise<any> {
    return { id: "dummy_session_updated", data: {} }
  }

  async retrievePayment(paymentSessionData: any): Promise<any> {
    return {}
  }

  async getWebhookActionAndData(payload: any): Promise<any> {
    return { action: "not_supported" }
  }
}

export default ManualPaymentProvider
