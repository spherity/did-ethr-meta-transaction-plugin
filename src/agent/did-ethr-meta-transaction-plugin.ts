import { IAgentPlugin } from '@veramo/core'
import {
  IAddAttributeArgs,
  IAddAttributeResult,
  IDidEthrMetaTransactionPlugin,
  IRequiredContext
} from '../types/IDidEthrMetaTransactionPlugin'
import { schema } from '../index'

/**
 * {@inheritDoc DidEthrMetaTransactionPlugin}
 * @beta
 */
export class DidEthrMetaTransactionPlugin implements IAgentPlugin {
  readonly schema = schema.DidProviderEthrMetaPlugin

  // map the methods your plugin is declaring to their implementation
  readonly methods: IDidEthrMetaTransactionPlugin = {
    addAttribute: this.addDelegate.bind(this),
  }



  /** {@inheritDoc DidProviderEthrMetaPlugin.addDelegate} */
  private async addDelegate(args: IAddAttributeArgs, context: IRequiredContext): Promise<IAddAttributeResult> {
    if(!args.did) {
      throw new Error("DID must not be empty")
    }
    if(!args.attributeName) {
      throw new Error("attributeName must not be empty")
    }
    if(!args.attributeValue) {
      throw new Error("attributeValue must not be empty")
    }

    const did = await context.agent.didManagerGet({
      did: args.did
    })
    if(!did) {
      throw new Error("DID not found")
    }
    if(did.provider !== 'ethr') {
      throw new Error("DID provider must be of type ethr")
    }
    // you can call other agent methods (that are declared in the `IRequiredContext`)
    //const didDoc = await context.agent.resolveDid({ didUrl: args.did })
    // or emit some events
    //await context.agent.emit('my-other-event', { foo: 'hello' })
    return { foobar: "ipsum" }
  }
}
