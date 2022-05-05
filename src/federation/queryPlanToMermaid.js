function hash() {
  return (Date.now() + Math.random().toString()).replaceAll('.', '');
}

/**
 * This code comes from the Studio-UI repo. We should talk with that team if we want a
 * sharable package
 *
 * https://github.com/mdg-private/studio-ui/blob/f4341fd691794e68901b5122403b038749d15a82/src/app/graph/explorerPage/resultsPane/queryPlan/queryPlanToMermaid.ts#L137
 * @param {import("@apollo/query-planner-1").PlanNode|import("@apollo/query-planner").PlanNode} currentNode
 * @return {{nodeText: string, startHash: string, endHash: string}}
 */
function process(currentNode) {
  switch (currentNode.kind) {
    case 'Sequence': {
      const processedChildren = currentNode.nodes.map(process);
      return {
        // TODO: Remove non null assertion, added when turning on noUncheckedIndexedAccess
        startHash: processedChildren[0]?.startHash,
        // TODO: Remove non null assertion, added when turning on noUncheckedIndexedAccess
        endHash: processedChildren.slice(-1)[0]?.endHash,
        nodeText: processedChildren
          .map((processedChild, i) => {
            if (i === 0) return processedChild.nodeText;
            const link = `${processedChildren[i - 1]?.endHash} --> ${
              processedChild.startHash
            }`;
            return `
              ${link}
              ${processedChild.nodeText}
            `;
          })
          .join(''),
      };
    }
    case 'Parallel': {
      const nodeHash = hash();
      return {
        startHash: nodeHash,
        endHash: nodeHash,
        nodeText: `
          ${nodeHash}("Parallel")

          ${currentNode.nodes
    .map((node) => {
      const processedChild = process(node);
      return `
                ${nodeHash} --> ${processedChild.startHash}
                ${processedChild.nodeText}
              `;
    })
    .join('')}
        `,
      };
    }
    case 'Fetch': {
      // TODO (jason) get tooltips to work here, seems to not be creating the
      // node at all. Should create node with class .mermaidTooltip
      // const tooltip = currentNode.operation
      //   ? `${currentNodeHash}_operation["${print(
      //       parse(currentNode.operation),
      //     ).replaceAll('\n', '<br/>')}"] -...- ${currentNodeHash}`
      //   : 'click ${nodeHash} unDefinedCallback "TooltipContents"';
      const nodeHash = hash();
      return {
        startHash: nodeHash,
        endHash: nodeHash,
        nodeText: `${nodeHash}("Fetch (${currentNode.serviceName})")`,
      };
    }
    case 'Flatten': {
      const nodeHash = hash();
      const processedChild = process(currentNode.node);

      return {
        startHash: processedChild.startHash,
        endHash: nodeHash,
        nodeText: `
          ${nodeHash}("Flatten (${currentNode.path
  .join(',')
  .replaceAll('@', '[]')})")
          
          ${processedChild.endHash} --> ${nodeHash}
          ${processedChild.nodeText}
        `,
      };
    }
    default:
      return currentNode;
  }
}

/**
 * @param {import("@apollo/query-planner").QueryPlan|import("@apollo/query-planner-1").QueryPlan} queryPlan
 * @return {string}
 */
export function queryPlanToMermaid(queryPlan) {
  const queryPlanNode = queryPlan.node;
  if (!queryPlanNode) {
    throw new Error('Invalid query plan');
  }

  return `
    graph TD
      ${process(queryPlanNode).nodeText}
  `.trim();
}
